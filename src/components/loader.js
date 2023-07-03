import React from 'react'
import ClipLoader from "react-spinners/SkewLoader";

function Loader() {

      
  return (
    <div style={{width:"100%",height:"100vh",position:"relative",display:"flex",justifyContent:"center"}}>
        <div     style={{margin:"auto"}}>
        <ClipLoader
         
         color='#000'
         loading={true}
     
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader"
       />
        </div>
    
    </div>
  )
}

export default Loader