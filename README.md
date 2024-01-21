# ZK Offchain Sentinel
![Screenshot 2024-01-21 at 9 49 09 PM](https://github.com/armanthepythonguy/LFGHO-ZK-OffchainSentinel/assets/66505181/7514210f-bb0d-4a65-8274-5ed8ca36935a)

## Overview
Using our protocol, you can collateralize your off-chain assets to mint GHO tokens on-chain using our secure Offchain-Sentinel Facilitator. We are using TLSN to generate ZK proofs stating your locked off-chain assets. For this hackathon, we have used Stripe in which users can pay in USD to a third party that can maintain an on-chain balance, which will be locked to mint the GHO tokens on-chain. 
Let's understand it from the perspective of users and the third party:-

1. **User**
   - You pay in USD to a third party using Stripe
   - You get the respective amount of GHO tokens you have collateralized off-chain assets for.
2. **ThirdParty**
   - Maintains assets on-chain
   - Receives USD payment off-chain from the user
   - Locks the on-chain assets to mint GHO tokens for the user.

![Screenshot 2024-01-21 at 9 49 18 PM](https://github.com/armanthepythonguy/LFGHO-ZK-OffchainSentinel/assets/66505181/a2f46994-8728-46a3-b286-c61cbdba6a92)

## How it works 
TLSN is used to generate proofs for payments made from users to third parties and vice-versa. These TLSN proving mechanisms are written in Rust as they need to be time and memory-efficient. We have designed two nodes for this project:-

1. Validator Node(Third Party):- Receives the webhook from Stripe generates a TLSN proof for the payment and shares it with the Sentinel Node.

2. Sentinel Node:- Receives and verifies the proof from the Validator node and calls the smart contract to mint GHO tokens. Similarly, receives payment proofs(TLSN) from the user and burns GHO tokens.

## Contract Addresses(Sepolia)
- **Sentinel Facilitator:** 0xDd81096cd08f4503C92036892968f55eff422cEC
- **Demo GHO:** 0x6389d8ac913FDFcE1dF2082305Bb7a9F5A9202C8
- **Sentinal Node Address(EOA):** 0x53d973560A9cF4576f4427bD5081e4BfcfBe9938
