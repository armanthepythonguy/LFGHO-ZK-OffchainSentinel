const express = require('express')
const axios = require('axios')
const fs = require("fs")
const stripe = require("stripe")
const app = express()
const port = 3003
const endpointSecret = "Your webhook secret"
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

app.post("/webhook", express.raw({type: 'application/json'}), async(req, res)=>{
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(err)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if(event.type == "checkout.session.completed"){
    let id = event.data.object.id
    os.execCommand(`cargo run --release --example stripe_prover ${id}`, function (){})
    const proof = require("../tlsn/stripe_proof.json")
    axios.post("http://127.0.0.1:3002/mintgho", {"proof":proof})
  }
  res.send()
})


app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})