const fs = require("fs")
const express = require('express')
let BigNumber = require("bignumber.js");
const axios = require('axios')
const {submitCollateral} = require("./helpers")
const app = express()
app.use(express.json())
const port = 3002
const exec = require('child_process').exec;
function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, {cwd:"../tlsn/"}, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            callback(stdout);
        });
    }
}
var os = new os_func();


app.post("/mintgho", async(req, res)=>{
    fs.writeFileSync("../tlsn/stripe_proof.json", JSON.stringify(req.body.proof))
    os.execCommand(`cargo run --release --example stripe_verifier`, async function (returnvalue){
        let provendata = JSON.parse(String(returnvalue).split("Strict-Transport-Security: max-age=63072000; includeSubDomains; preload")[1].split("-------")[0])
        const price = new BigNumber(10).pow(18).times(parseInt(provendata.metadata.collateral))
        await submitCollateral(provendata.metadata.address, price.toFixed(), "0x05e8E33Da8D80d3c493030d7D80d8310488Fd1aB")
    })
    res.send()
})


app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})