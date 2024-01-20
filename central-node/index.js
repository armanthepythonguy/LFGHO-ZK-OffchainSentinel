const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
const port = 3001

app.post("/webhook", express.raw({type: "application/json"}), async(req, res)=>{
    const sig = req.headers['stripe-signature']
    const body = req.body
    let validator_res = await axios.post("validator-url", {sign:sig, body:body})
    payment_id = validator_res.data
    if(payment_id.type === 'checkout.session.completed'){
        validator_res = await axios.post("validator-url", {id: payment_id.data.object.id})
        
    }
})


app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})