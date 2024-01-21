import { Box, Grid, Modal, Typography } from "@mui/material";
import Navigation from "../components/navigation";
import '../App.css';
import Footer from "../components/footer";
import gemini from '../Assets/backgroundAve.png';
import createBtn from '../Assets/createbtn.png';
import payBtn from '../Assets/payStripe.png';
import success from '../Assets/success.gif';
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#9c559c',
    // background: "linear-gradient(#6c1e6d,#9c559c, #6eb6c3)",
    border: '2px solid white',
    borderRadius:"20px",
    p: 4,
    color:"black",
    maxHeight:"500px",
    overflowY:"auto",
    scrollbarWidth: "thin",
    fontFamily:"'Kalnia', serif",
  };

function Home(){
    const [open,setOpen]=useState(false);
    const [collateral,setCollateral]=useState("");
    const [tokens,setTokens]=useState(0);
    const [isSuccess,setIsSuccess]=useState(false);
    const [isError,setIsError]=useState(false);
    const [account,setAccount]=useState("");
    const [isConnected,setIsConnected]=useState(false);
    const handleClose=()=>{
        setOpen(false);
    }
    const handleSuccessClose=()=>{
      setIsSuccess(false);
  }
  const handleErrorClose=()=>{
    setIsError(false);
}
useEffect(()=>{
  console.log(isConnected,"isConnected")
},[isConnected])
    useEffect(()=>{
      if(window.location.href.includes('?')){
     if(window.location.href.includes('?success')){
  setIsSuccess(true);
      }
      else if(window.location.href.includes('?error')){
        setIsError(true);
      }
    }
    else{
      setIsSuccess(false);
      setIsError(false);
    }
     },[])
 
const getStripes=async ()=>{
  if(isConnected){
     setOpen(true);
  }
  else{
    setOpen(false);
    alert("Please connect wallet")
  }
}
const handlePay=()=>{
    axios.post("http://localhost:3001/create-checkout-session",{address:account,usd:collateral,tokens:tokens}).then((res)=>{
        console.log(res,"res")
         window.location.href=res.data;
      })
}
const handleInput=(e,type)=>{
  if(type==="collateral"){
    setCollateral(e.target.value);
    setTokens(e.target.value);
  }
}
    return(
        <>
         <div className="main-div">
   
     
           <Grid item xs={12} sx={{paddingLeft:"2px",paddingRight:"2px"}}>
               <div >
           <Navigation setAccount={(account)=>setAccount(account)} setIsConnected={(isConnected)=>{setIsConnected(isConnected)}} isConnected={isConnected}/>
           </div>
           </Grid>
         
             
           <Grid container item xs={12} justifyContent={"center"} alignItems={"center"}>
         <Grid item xs={1}></Grid>
           <Grid item xs={5} justifyContent={"center"} sx={{height:"100%",width:"100%"}}>
            <div className="side-cryptos">
            <img className="side-crypto" src={gemini} alt="crypto" />
            </div>
           </Grid>
           <Grid item xs={0.5}></Grid>
           <Grid container item xs={5.5} spacing={2} justifyContent={"center"} alignItems={"center"}>
          
          <div className="form-contain">
            
          <Grid item xs={12}></Grid>
            <Grid item xs={12} sx={{width:"100%"}}>
            <div className="right-sub">
            <div>
              <h3 style={{margin:0}}>Stake and Gain</h3> 
            </div>
            {/* <div style={{display:"flex",gap:"6px"}}>
            <h3 style={{margin:0}}>Fabulous</h3><h2 style={{margin:0}}> GHO</h2>
            </div> */}
            <div>
            <h2 style={{margin:0}}>GHO TOKENS </h2>
            </div>
            </div>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={7} sx={{width:"100%",height:"100%"}}>
            <div className="form-container">
           
            <input type="text" name="collateral" placeholder="Collateral" onChange={(e)=>handleInput(e,"collateral")}/>
          
            <div className="wrapper">
            <input type="text" name="tokens" value={collateral} placeholder="No. of Tokens" />
            <div className="units"><span >GHO</span></div>
            
            </div> 
            <div className="btn-container">
            {/* <button onClick={getStripes} className="button-create">Create Order</button> */}
            <button onClick={getStripes} className="button-create"><img width={'210px'} height={"55px"} src={createBtn} alt="btn"/></button>
            </div>
               <div className="success-error">
                
                </div>    
             
            </div>
          
             
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}></Grid>
            </div>
          
           </Grid>
          
           </Grid>
           
           <Grid item xs={12}>
               
           <Footer />
           
         
           </Grid>
           <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="form-main">
<div className="verify-container">
<h3>Collateral : {collateral}</h3>
<h3>No of Tokens : {tokens}</h3>
  <div className="button-verify">
    {/* {!isVerifyLoading? */}
    
    {/* <button size="small" className="button-pay" onClick={()=>{handlePay()}}>Pay with Stripe</button> */}
  <button size="small" className="button-pay" onClick={()=>{handlePay()}}><img className="pay-img" width={"210px"} height={"60px"} src={payBtn} alt="paybtn" /></button>
  
 </div>
</div>
</div>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={isSuccess}
        onClose={handleSuccessClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description">
          <div className="form-main" style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
          <img width="120px" height="100px" src={success} alt="success" />
<div className="verify-container">
 Payment Completed Successfully!!
  <div className="button-verify">
    {/* {!isVerifyLoading? */}
    
    {/* <button size="small" className="button-pay" onClick={()=>{handlePay()}}>Pay with Stripe</button> */}

  
 </div>
</div>
</div>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={isError}
        onClose={handleErrorClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="form-main" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div className="verify-container">
  Error in Payment!Please try again
  <div className="button-verify">
    {/* {!isVerifyLoading? */}
    
    {/* <button size="small" className="button-pay" onClick={()=>{handlePay()}}>Pay with Stripe</button> */}

  
 </div>
</div>
</div>
          </Typography>
        </Box>
      </Modal>
         </div>
        </>
    )
}
export default Home;