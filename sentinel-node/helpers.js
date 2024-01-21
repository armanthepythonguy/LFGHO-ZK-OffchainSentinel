const {ethers, JsonRpcProvider} = require("ethers")
const contractABI = require("./abi.json")

async function submitCollateral(to, amount, facilitator){
    const contractAddress = "0xDd81096cd08f4503C92036892968f55eff422cEC";
    const provider = new JsonRpcProvider("Your RPC Provider");
    const wallet = new ethers.Wallet("PRIVATE KEY", provider)
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    let tx = await contract.mintToken(to, amount, facilitator)
    tx.wait()
}

module.exports = {submitCollateral}