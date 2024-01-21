import { useEffect, useState } from "react";
import '../components/navigation.css';
import teamPic from '../Assets/teamPic.png';
import { Grid } from "@mui/material";

function Footer() {
 
  return (
    <div className="footer-main">
      <Grid container>
        <Grid item xs={2}>
   
      </Grid>
      <Grid item xs={7}>
      
      </Grid>
      <Grid container item xs={3}  alignContent={"center"} justifyContent={"center"} alignItems={"center"} spacing={2}>
     <Grid item xs={12}>
     <img width="275px" height="55px" src={teamPic} alt="team" />
  </Grid>
  
 
  </Grid>
  </Grid>
  </div>
  )
}
export default Footer;