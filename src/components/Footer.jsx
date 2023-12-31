import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import "./Fotter.css"
import Upfotter from './Upfotter';

function Copyright() {
  return (
    <div >
    <Typography variant="body2" color="text.secondary">
      <div className="foot_head">
      {'Copyright © '}
      <Link color="inherit" href="" className="foot_tit" >
        Lapii.Store 
      </Link>{' '} 
      {new Date().getFullYear()}
      {'.'}
      <div className="foot_sec">
       All rights reserved.
       </div>
       <div className="foot_last">
       <p className="foot_cond">Conditions of use & Sale <span>|</span> Privacy Policy <span>|</span> Terms of Use</p>
       <p className="foot_ind">India</p>
       </div>
       </div>
    </Typography>
    </div>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="midd_cont">
        <CssBaseline />
       <Upfotter/>
        <div >
          <div className="mid_div">
       <div className="mid_cont_head">
        <p className="mid_con_para">We’d love to hear what you think!</p>
        <button className="mid_con_btn">Give  feedback</button>
       </div>
       </div>
        <Box
          component="footer"
          style={{backgroundColor:"#0978e3"}}
          // height={95}
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container >
            <hr className="line"/>
            <div id="about">
            <Copyright />
            </div>
          </Container>
         
        </Box>
      </div>
      </div>
     
    </ThemeProvider>
  );
}