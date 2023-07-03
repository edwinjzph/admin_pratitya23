import {TextField } from '@mui/material'
import React, { useCallback } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./all.css"
import { auth } from '../firebase';
import Snackbar from '@mui/material/Snackbar';
import Loader from './loader';


function Signin() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState([ "","success"]);
    const [active, setActive] = React.useState(false);
    const [user, setUser] = React.useState({
      email: "",
      password: "",
    });
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
    const handleChange = useCallback((e) => {
      const { name, value } = e.target; 
      setUser({ ...user, [name]: value });
    }
      ,[user])

   const signIn =(e) =>{
    e.preventDefault();
    setActive(true)
        auth.signInWithEmailAndPassword(
            user.email,
            user.password
    
        ).then((authUser) => {
 setActive(false)
                }).catch((error) =>{
                  setActive(false)
                  setOpen([ error.message,"error"])
                });}
        
                const handleClose = (event, reason) => {
                  if (reason === 'clickaway') {
                    return;
                  }
                
                  setOpen(["","success"]);
                };

   
  return (
    <>
   {active?<Loader/>:
    <>
    <div className='signin'>
     
              <Snackbar open={open[0]!==""} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={open[1]} sx={{ width: '100%' }}>
                    {open[0]}
                    </Alert>
                  </Snackbar>
            <div className="sign_first">
                <div className="signinbox">
             <h1 style={{textAlign:'center'}}>Pratitya</h1>
                  <>
                <p>{"Sign In"}</p>
              
              <form onSubmit={signIn} style={{width :"100%" ,display : "flex" ,flexDirection : "column", gap :"20px"}}>
              <TextField  required type="email"    onChange={handleChange} name = "email"  fullWidth label="Enter your email address" id="fullWidth" />
              <FormControl    required  autoComplete='off' variant="outlined">
          <InputLabel   required htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={handleChange}
            name = "password"
            required
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment sx={{height : "100%" }} position="end">
                <IconButton
                 sx={{height : "100%" }} 
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                 
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <div className="button_wrap">
        <button type="submit"  className='account_btn'>SIGN IN</button>
   
                
        </div>
        </form></>
        
    
                </div>
            
            </div>
        
    
        </div>
   </>}
    
     </>
  )
}

export default Signin