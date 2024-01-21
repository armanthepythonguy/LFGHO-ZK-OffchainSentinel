// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title GHOSentinel Contract
/// @notice This contract manages offchain facilitators for GhoToken, including funding, minting, burning, and withdrawing operations.
/// @dev Inherits AccessControl for role management and interacts with ERC20 (DAI) and GhoToken contracts.
contract GHOSentinel is AccessControl {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    IERC20 public _daiToken;
    IGhoToken public _ghoToken;
    mapping(address facilitator => uint256 mintLimit) public _facilitatorLimit;
    mapping(address facilitator => mapping(address user => uint256 ghoBalance)) public _offchainGhoBalance;
    uint256 public _treasury;

    // Custom Errors
    error OffchainGHO_InsufficientFacilitatorLimit();
    error OffchainGHO_InsufficientTreasuryFunds();
    error OffchainGHO_DAITransferFailed();
    error OffchainGHO_InsufficientGhoBalance();

    // Events
    event OffchainGHO_OffchainFacilitatorCreated(address indexed facilitator, uint256 amount);
    event OffchainGHO_TokensMinted(address indexed mintTo, uint256 amount, address indexed facilitatorAddress);
    event OffchainGHO_TokensBurned(uint256 amount);
    event OffchainGHO_Withdrawal(address indexed facilitator, uint256 amount);

    /// @notice Constructor sets up roles and token addresses.
    /// @param daiTokenAddress The address of the DAI ERC20 token contract.
    /// @param ghoTokenAddress The address of the GhoToken contract.
    constructor(address daiTokenAddress, address ghoTokenAddress) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
        _daiToken = IERC20(daiTokenAddress);
        _ghoToken = IGhoToken(ghoTokenAddress);
    }

    /// @notice Allows an offchain facilitator to fund themselves.
    /// @dev Transfers DAI from the sender to this contract and updates facilitator limits and treasury.
    /// @param amount The amount of DAI to fund.
    function fundOffchainFacilitator(uint256 amount) public {
        if (!_daiToken.transferFrom(msg.sender, address(this), amount)) revert OffchainGHO_DAITransferFailed();

        _facilitatorLimit[msg.sender] += amount;
        _treasury += amount;
        emit OffchainGHO_OffchainFacilitatorCreated(msg.sender, amount);
    }

    /// @notice Mints GhoTokens to a specified address.
    /// @dev Requires VERIFIER_ROLE; checks facilitator limit before minting.
    /// @param mintTo Address to which tokens will be minted.
    /// @param amount Amount of tokens to mint.
    /// @param facilitatorAddress Address of the offchain facilitator.
    function mintToken(address mintTo, uint256 amount, address facilitatorAddress) public onlyRole(VERIFIER_ROLE) {
        if (_facilitatorLimit[facilitatorAddress] < amount) {
            revert OffchainGHO_InsufficientFacilitatorLimit();
        }
        _facilitatorLimit[facilitatorAddress] -= amount;
        _offchainGhoBalance[facilitatorAddress][mintTo] += amount;
        _ghoToken.mint(mintTo, amount);
        emit OffchainGHO_TokensMinted(mintTo, amount, facilitatorAddress);
    }

    /// @notice Burns GhoTokens from a specified address.
    /// @dev Requires enough _offchainGhoBalance in the burnFrom address before burning.
    /// @param burnFrom Address from which tokens will be burned.
    /// @param amount Amount of tokens to burn.
    /// @param facilitatorAddress Address of the offchain facilitator.
    function burnToken(address burnFrom, uint256 amount, address facilitatorAddress) public onlyRole(VERIFIER_ROLE) {
        if (_offchainGhoBalance[facilitatorAddress][burnFrom] < amount) {
            revert OffchainGHO_InsufficientGhoBalance();
        }

        _facilitatorLimit[facilitatorAddress] += amount;
        _offchainGhoBalance[facilitatorAddress][burnFrom] -= amount;
        _ghoToken.transferFrom(burnFrom, address(0), amount);
        emit OffchainGHO_TokensBurned(amount);
    }

    /// @notice Allows a facilitator to withdraw their funded DAI.
    /// @dev Checks for sufficient facilitator limit before permitting withdrawal.
    /// @param amount Amount of DAI to withdraw.
    function withdrawDAI(uint256 amount) public {
        if (_facilitatorLimit[msg.sender] < amount) {
            revert OffchainGHO_InsufficientFacilitatorLimit();
        }
        _facilitatorLimit[msg.sender] -= amount;
        _treasury -= amount;
        if (!_daiToken.transfer(msg.sender, amount)) revert OffchainGHO_DAITransferFailed();

        emit OffchainGHO_Withdrawal(msg.sender, amount);
    }
}

interface IGhoToken {
    function mint(address account, uint256 amount) external;
    function burn(uint256 amount) external;
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}