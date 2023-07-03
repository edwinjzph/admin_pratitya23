import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, Select, Tab, Tabs, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploading from 'react-images-uploading';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IconButton } from '@mui/material';
import "./all.css"
import Switch from '@mui/material/Switch';
import db, { auth, createcategorie, createEvent, createGeneral, createimage } from '../firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import img from "./assets/hand.png";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';



function Admin({events,general,imagesv1,categories}) {
  const [openv1, setOpenv1] = React.useState([ "","success"]);
    const [addevent, setAddevent] = React.useState(false);
    const [addcate, setAddcate] = React.useState(false);
    const [addimage, setAddimage] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [id, setId] = React.useState();
    const [state, setState] = React.useState({
      vertical: 'top',
      horizontal: 'left',
    });
    const { vertical, horizontal } = state;
    const [images2, setImages2] = React.useState([]);
    const [event, setEvent] = React.useState({
        Event_name: "",
        description: "",
        image: "",
        imageurl:"",
        head_name:"",
        PhoneNumber:"",
        venue:"",
        price:"",
        eventid:"",
        rules:"",
        categorieid:"",
        link:"",
        date:"",
        registration: true,
        active: true
      });
      const [categorie, setCatgorie] = React.useState({
        categorie_name: "",
      });
      const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
    if(data){
      deletemenu(id)
      deletemenu2(id)
    }

  };
      const [generals, setGenerl] = React.useState({
        eventname: "",
        eventdate: "",
        logo: "",
        apm1: "",
        apm1phn: "",
        apm2: "",
        apm2phn: "",
        themeColor: "",
        pm:"",
        pmphn:"",
        about: "",
        convenor: "",
        convenorphn: "",
        generalmail: "",
        instaurl: "",
        favicon: "",
        registration: false,
      });

      const [value, setValue] = React.useState('one');
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        setEvent({...event,image:imageList.length>0? imageList[0].file:""})
      };
      const onChange2 = (imageList, addUpdateIndex) => {
   
        setImages2(imageList);
      };

      useEffect(() => {
     
        setGenerl(
          {
            eventname: general?.eventname,
            eventdate: general?.eventdate,
            logo: general?.logo,
            apm1: general?.apm1,
            apm1phn: general?.apm1phn,
            apm2: general?.apm2,
            apm2phn: general?.apm2phn,
            pm:general?.pm,
            pmphn:general?.pmphn,
            themeColor: general?.themeColor,
            about:general?.about,
            convenor: general?.convenor,
            convenorphn: general?.convenorphn,
            generalmail: general?.generalmail,
            instaurl: general?.instaurl,
            favicon: general?.favicon,
            registration: general?.registration,
          }
        )
      
        
      }, [general])
     
      
      const handleChange2 = useCallback((e) => {
        const { name, value } = e.target; 
        console.log(name,value)
        if(name==="registration"){
event.registration = !event.registration
        }else if(name==="active"){
            event.active = !event.active
        }else{
            setEvent({ ...event, [name]: value });
        }
       
      }
        ,[event])


        console.log(event)
        const handleChange5 = useCallback((e) => {
          const { name, value } = e.target; 
          setCatgorie({ ...categorie, [name]: value });
        }
          ,[categorie])
        const handleChange3 = useCallback((e) => {
          const { name, value } = e.target; 
          console.log(name,value)
          if(name==="registration"){
  generals.registration = !generals.registration
          }else{
              setGenerl({ ...generals, [name]: value });
          }
         
        }
          ,[generals])
      
          const uploadData = ((e) =>{
            e.preventDefault();
            if(event.image!=="" || event.imageurl!==""){
              if(event.categorieid){
                console.log(event.categorieid)
                createEvent(event).then(()=>{
                  console.log("uploaded")
                  setAddevent(false)
                  setEvent({
                    Event_name: "",
                    description: "",
                    image: "",
                    rules:"",
                    imageurl:"",
                    head_name:"",
                    PhoneNumber:"",
                    venue:"",
                    categorieid:"",
                    price:"",
                    link:"",
                    date:"",
                    eventid:"",
                    registration: true,
                    active: true
                  })
                  setImages([])
              
                })
              }else{
                alert("Add Categorie")
              }
    }else{
              alert("Add Image")
            }
              
          })
          const uploadData2 = ((e) =>{
            e.preventDefault();
            createGeneral(generals).then(()=>{
              setOpenv1([ "Data updated","success"])
            })
              
          })
          const uploadData3 = ((e) =>{
            e.preventDefault();
            if(images2.length===0) return
            createimage(images2).then(()=>{
              console.log("uploaded")   
              setAddimage(false)
              setOpenv1([ "Image Added","success"])
              setImages2([])  
            })
              
          })
          const deletemenu = ((id) =>{
            db.collection("events").doc(id).delete().then(() => {
              setOpenv1([ "Document successfully deleted!","success"])
          }).catch((error) => {
              setOpenv1([ `rror removing document:${error}`,"error"])
          })
          })
          const deletemenu2 = ((id) =>{
            db.collection("images").doc(id).delete().then(() => {
              setOpenv1([ "Document successfully deleted!","success"])
          }).catch((error) => {
            setOpenv1([ `error removing document:${error}`,"error"])
          })
          })
          const editmenu = ((data) =>{
            if(data ==null) return
            setAddevent(true)
            setEvent({
                Event_name: data[1].Event_name,
                description: data[1].description,
                image: data[1].image,
                rules: data[1].rules,
                imageurl: data[1].imageurl,
                head_name: data[1].head_name,
                PhoneNumber: data[1].PhoneNumber,
                price:data[1]?.price,
                venue: data[1].venue,
                link: data[1].link,
                categorieid: data[1].categorieid,
                date: data[1].date,
                eventid: data[0],
                registration: data[1].registration,
                active: data[1].active
            })
          
          })
          const uploadcate = ((e) =>{
            e.preventDefault();
            createcategorie(categorie).then(()=>{
              setAddcate(false)
              setCatgorie({
                categorie_name: "",
              })
            })
              
          })
          const deletecate = ((id) =>{ 
            db.collection('categories').doc(id).delete().then(() => {
              console.log("Document successfully deleted!");
          }).catch((error) => {
              console.error("Error removing document: ", error);
          })
          })
          const handleClose2 = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
          
            setOpenv1(["","success"]);
          };
  return (
    <div> 
           <Snackbar open={openv1[0]!==""} autoHideDuration={3000} onClose={handleClose2}         anchorOrigin={ {vertical,horizontal}}>
                    <Alert onClose={handleClose2} severity={openv1[1]} sx={{ width: '100%' }}>
                    {openv1[0]}
                    </Alert>
                  </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={()=>{handleClose(false)}}>No</Button>
          <Button onClick={()=>{handleClose(true)}} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
        <div className="addmenu_sub">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
            <h2>Hey, Pratitya</h2>
            <img style={{height:"40px"}} alt='hand' src={img}></img>
            </div>
       <button style={{cursor:"pointer",padding:"10px",background:"white",borderRadius:"10px",border:"2px solid purple"}} onClick={()=>{auth.signOut()}}>Sign Out</button>
          </div>
   
           <Box sx={{ width: '100%'  ,}}>
           <TabContext value={value}>

 
<Tabs
  value={value}
onChange={handleChange}
  textColor="secondary"
  indicatorColor="secondary"
  aria-label="secondary tabs example"
>
<Tab value="one" label="General" />
  <Tab value="two" label="Events" />
  <Tab value="three" label="Categories"/>
  <Tab value="four" label="Images" />
</Tabs>
<TabPanel sx={{padding : '0px'}} value="two">
<Box sx={{ width: '100%',marginTop: '10px' , marginBottom : '20px'}}>
<div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
{(events && Object.entries(events).length>0) &&
  <>
  
 { !addevent ?  <div  style={{width:"100%",display:"flex",justifyContent:"end",marginTop:"10px"}}>



  <IconButton onClick={()=>{setAddevent(true);    setEvent({
      Event_name: "",
      description: "",
      image: "",
      rules:"",
      imageurl:"",
      head_name:"",
      price:"",
      PhoneNumber:"",
      categorieid:"",
      eventid:"",
      venue:"",
      link:"",
      date:"",
      registration: true,
      active: true
    
    })}} style={{color:"#9c27b0",}} disableRipple={true}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
    <h5 style={{margin:"0px"}}>Create New</h5>
<AddIcon  aria-hidden="true"></AddIcon>
</IconButton>
</div>:
<div style={{width:"100%",display:"flex",justifyContent:"start"}}>
  <IconButton onClick={()=>{setAddevent(false)}} style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >

<ArrowBackIcon  aria-hidden="true"></ArrowBackIcon>
</IconButton>
</div>}
</>}

{(events && Object.entries(events).length>0) && !addevent?
Object.entries(events).map((value,index) =>{
  return ( 
  <div key={index} className='menuitems_dis' style={{display:"flex",justifyContent:"space-between",height:"80px",alignItems:"center",borderRadius:"7px"}}>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"7px"}}>
    <img alt='images' style={{height:"80px",objectFit:"cover",borderRadius:"7px  0 0 7px",width:"80px"}} src={value[1]?.imageurl}></img>
    <div  style={{display:"flex",flexDirection:"column",height:"60px",alignItems:"start",justifyContent:"center"}}>
      <span  style={{color:"#6d2bdc"}}>{value[1]?.Event_name}</span>
      {value[1]?.registration?    <span style={{color:"green"}}>Registration: Opened</span>:<span style={{color:"red"}}>Registration: Closed</span>}
    </div>
    </div>
    <div style={{display:"flex",gap:"10px"}}>
    <IconButton onClick={()=>{editmenu(value)}} className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <EditIcon  aria-hidden="true"></EditIcon>
 </IconButton>
    <IconButton   onClick={()=>{handleClickOpen();setId(value[0])}}className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <DeleteIcon  aria-hidden="true"></DeleteIcon>
 </IconButton>
    </div>

  </div>
  )
})
: <form onSubmit={uploadData}>
<div className="details">
    <h4>Details</h4>
<TextField  value={event.Event_name} onChange={handleChange2}   name='Event_name'  required fullWidth id="outlined-basic" label="Event Name" variant="outlined" sx={{marginTop: '10px'}} />
<TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange2} 
      value={event.description}
      name='description'
      label="Description (line break- \n)"
      sx={ { marginTop : '10px'}
      }
      multiline
      rows={4}
   
    />

    <TextField
      id="outlined-multiline-static"
      fullWidth
      value={event.rules}
      required
      onChange={handleChange2} 
      name='rules'
      label="Rules (line break- \n)"
      sx={ { marginTop : '10px'}
      }
      multiline
      rows={4}
   
    />
        <TextField
      id="outlined-multiline-static"
      fullWidth
      value={event.price}
      type="number"
      onChange={handleChange2} 
      required
      name='price'
      label="Price Worth"
      sx={ { marginTop : '10px'}
      }

    />
    <TextField
      id="outlined-multiline-static"
      fullWidth
      value={event.head_name}
      onChange={handleChange2} 
      required
      name='head_name'
      label="Head name"
      sx={ { marginTop : '10px'}
      }

   
    />
    <TextField
      id="outlined-multiline-static"
      fullWidth
      onChange={handleChange2} 
      required
      type="number"
      value={event.PhoneNumber}
      name='PhoneNumber'
      label="Head Phonenumber"
      sx={ { marginTop : '10px'}
      }

    />
    <TextField
      id="outlined-multiline-static"
      fullWidth
      onChange={handleChange2} 
      required
      value={event.venue}
      name='venue'
      label="Venue"
      sx={ { marginTop : '10px'}
      }

   
    />
    <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange2} 
      value={event.date}
      name='date'
      label="Date and Time"
      sx={ { marginTop : '10px'}
      }
    
   
    />
       <TextField
      id="outlined-multiline-static"
      fullWidth
      onChange={handleChange2} 
      value={event.link}
      required
      name='link'
      label="Googleform Link"
      sx={ { marginTop : '10px'}
      }
    
   
    />

</div>
<div className="details">
<h4>Categorie</h4>
{categories && Object.entries(categories).length>0 ?     <FormControl required fullWidth sx={{marginTop : '10px'}}>
    <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"  
      label="categorie"
      name='categorieid'
      value={event.categorieid}
      onChange={handleChange2}
    >
   
      {Object.entries(categories).map((value,index) =>{
        return (
      
             <MenuItem key={index} value={value[0]}>{value[1].cate}</MenuItem>
      
        )
     
      })}
    </Select>
  </FormControl>: <div className='add_cate' ><span onClick={() =>{setValue("three")}} className='cate_route'>Add Categorie</span></div> }

     
</div>

<div className="details">
<h3>Image</h3>
<ImageUploading
    multiple
    value={images}
    onChange={onChange}
    maxNumber={1}
    dataURLKey="data_url"
  >
    {({
      imageList,
      onImageUpload,
      onImageRemove,
      isDragging,
      dragProps,
    }) => (
        
        <div className="upload__image-wrapper">

        <div
        className='image_view'
          style={isDragging ? { color: 'red' } : undefined}
         
          {...dragProps}
        >{(imageList.length===0 &&event.imageurl==="")  && <div className='click_on' onClick={onImageUpload}> <h5> Click or Drop here</h5></div>   }
   { event.imageurl!==""  &&      <div  className="image-item">
             <img src={ event.imageurl} alt="cover" />
         
       <IconButton onClick={() =>{setEvent({...event,imageurl:""})}}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
<ClearIcon  aria-hidden="true"></ClearIcon>
</IconButton>
  
        </div> }
        {imageList.map((image, index) => (
          <div key={index} className="image-item">
             <img src={ image['data_url']} alt="" />
         
       <IconButton onClick={() => onImageRemove(index)} className='flair-badge-wrapper' aria-label="remove"    size="small" >
<ClearIcon  aria-hidden="true"></ClearIcon>
</IconButton>
  
        </div> 
        ))} 
        </div>
      </div>
  
    
    )}
  </ImageUploading>

  </div>
   
  <div className="details">
    <h4>Status</h4>
    <div className="sta" style={{display:"flex",gap:"0px",marginTop:"10px",flexDirection:"column"}}>
        <div >
        

    <FormControlLabel onChange={handleChange2} name="registration" control={<Switch defaultChecked={event.registration===true?true:false} />} label="Registration status" />
        </div>
        <div >
        <FormControlLabel  onChange={handleChange2}  name="active" control={<Switch  defaultChecked={event.active===true?true:false}  />} label="Active" />
        </div>
   
    </div>

</div>
<button type='submit'  className="save_changes">
    <h4>Save Changes</h4></button>

</form>}
    </div></Box>

</TabPanel>

<TabPanel sx={{padding : '0px'}} value="one">
<Box sx={{ width: '100%',marginTop: '10px' , marginBottom : '20px'}}>
  <form onSubmit={uploadData2}>
    
 <FormControlLabel onChange={handleChange3}  name="registration" control={<Switch defaultChecked={general.registration} />} label="Registration status" />
<TextField
      id="outlined-multiline-static"
      fullWidth
      required
      value={generals?.eventname}
      onChange={handleChange3}
      name='eventname'
      label="Event Name"
      sx={ { marginTop : '10px'}
      }
    />
            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      name='about'
      onChange={handleChange3}
      value={generals?.about}
      label="About event"
      sx={ { marginTop : '10px'}
      }

    />
            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      name='eventdate'
      onChange={handleChange3}
      value={generals?.eventdate}
      label="Event Date - mm/dd/yyyy"
      sx={ { marginTop : '10px'}
      }

    />
            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.generalmail}
      name='generalmail'
      label="Event official mail"
      sx={ { marginTop : '10px'}
      }

    />
            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.logo}
      name='logo'
      label="Logo URL"
      sx={ { marginTop : '10px'}
      }

    />
                <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.favicon}
      name='favicon'
      label="favicon"
      sx={ { marginTop : '10px'}
      }

    />
    
                <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.instaurl}
      name='instaurl'
      label="Instagram Profile URL"
      sx={ { marginTop : '10px'}
      }

    />
 
                    <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.themeColor}
      name='themeColor'
      label="Event Theme Color"
      sx={ { marginTop : '10px'}
      }

    />

                            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.convenor}
      name='convenor'
      label="Convenor Name"
      sx={ { marginTop : '10px'}
      }

    />
                                <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.convenorphn}
      name='convenorphn'
      label="Convenor Phonenumber"
      sx={ { marginTop : '10px'}
      }
    />
                                    <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.pm}
      name='pm'
      label="PM Name"
      sx={ { marginTop : '10px'}
      }

    />
                                        <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.pmphn}
      name='pmphn'
      label="PM phonenumber"
      sx={ { marginTop : '10px'}
      }

    />
                                            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      name='apm1'
      onChange={handleChange3}
      value={generals?.apm1}
      label="(1) APM Name"
      sx={ { marginTop : '10px'}
      }

    /> 
    <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.apm1phn}
      name='apm1phn'
      label="(1) APM Phonenumber"
      sx={ { marginTop : '10px'}
      }

    />
        <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.apm2}
      name='apm2'
      label="(2) APM Name"
      sx={ { marginTop : '10px'}
      }

    />
            <TextField
      id="outlined-multiline-static"
      fullWidth
      required
      onChange={handleChange3}
      value={generals?.apm2phn}
      name='apm2phn'
      label="(2) APM Phonenumber"
      sx={ { marginTop : '10px'}
      }

    />
    <button type='submit'  className="save_changes">
    <h4>Save Changes</h4></button>
    </form>
</Box>
</TabPanel>

  <TabPanel sx={{padding : '0px'}} value="three"><Box sx={{ width: '100%',marginTop: '10px' , marginBottom : '20px'}}>
<div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
  {(categories && Object.entries(categories).length>0) &&
  <>
  
 { !addcate ?  <div  style={{width:"100%",display:"flex",justifyContent:"end",marginTop:"10px"}}>



  <IconButton onClick={()=>{setAddcate(true)}} style={{color:"#9c27b0",}} disableRipple={true}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
    <h5 style={{margin:"0"}}>Create New</h5>
<AddIcon  aria-hidden="true"></AddIcon>
</IconButton>
</div>:
<div style={{width:"100%",display:"flex",justifyContent:"start"}}>



  <IconButton onClick={()=>{setAddcate(false)}} style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >

<ArrowBackIcon  aria-hidden="true"></ArrowBackIcon>
</IconButton>
</div>}
</>}



    {(categories && Object.entries(categories).length>0) && !addcate?
    Object.entries(categories).map((value,index) =>{
      return (
        
        <div key={index} className='cate_box' style={{display:"flex",justifyContent:"space-between",height:"60px",padding:"10px",boxShadow:"rgba(74, 67, 67, 0.2) 0px 2px 8px 0px",alignItems:"center",cursor:"pointer",borderRadius:"10px"}}>
        <span style={{color:"#6d2bdc"}}>{value[1].cate.toUpperCase()}</span>
        <IconButton onClick={()=>{deletecate(value[0])}}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <DeleteIcon  aria-hidden="true"></DeleteIcon>
 </IconButton>
      </div>
      )
    
    }):  <form onSubmit={uploadcate} className="details">
    <h4>Details</h4>
    
<TextField required onChange={handleChange5}     value={categorie.categorie_name} name='categorie_name' fullWidth id="outlined-basic" label="Categorie" variant="outlined" sx={{marginTop: '10px'}} />
        <button type='submit'  className="save_changes">
    <h4>Save Changes</h4></button>

</form> }
    </div>
  
    

  
   
   

</Box></TabPanel>

<TabPanel sx={{padding : '0px'}} value="four">
<Box sx={{ width: '100%',marginTop: '10px' , marginBottom : '20px'}}>
{ !addimage ?  <div  style={{width:"100%",display:"flex",justifyContent:"end",marginTop:"10px"}}>



<IconButton onClick={()=>{setAddimage(true)}} style={{color:"#9c27b0",}} disableRipple={true}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
  <h5 style={{margin:"0px"}}>Add New</h5>
<AddIcon  aria-hidden="true"></AddIcon>
</IconButton>
</div>:
<div style={{width:"100%",display:"flex",justifyContent:"start"}}>
<IconButton onClick={()=>{setAddimage(false)}} style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >

<ArrowBackIcon  aria-hidden="true"></ArrowBackIcon>
</IconButton>
</div>}
<div>
{(imagesv1 && Object.entries(imagesv1).length>0) && !addimage?   <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

{ imagesv1 && Object.entries(imagesv1).map((value,id) =>{
return(
  <div key={id} className='menuitems_dis' style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"10px",gap:"20px"}}>
    <img alt='cover' style={{height:"100px",width:"50%",objectFit:"cover",borderRadius:"10px 0px  0px 10px"}} src={value[1].img}></img>
    <IconButton   className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <DeleteIcon  onClick={()=>{handleClickOpen();setId(value[0])}}  aria-hidden="true"></DeleteIcon>
 </IconButton>
  </div>
)}
)}
  </div>:<form onSubmit={uploadData3}> 

 
<div className="details">
<h3>Image</h3>
<ImageUploading
    multiple
    value={images2}
    onChange={onChange2}
    maxNumber={1}
    dataURLKey="data_url"
  >
    {({
      imageList,
      onImageUpload,
      onImageRemove,
      isDragging,
      dragProps,
    }) => (
        
        <div className="upload__image-wrapper">

        <div
        className='image_view'
          style={isDragging ? { color: 'red' } : undefined}
         
          {...dragProps}
        >{imageList.length===0 &&   <div className='click_on' onClick={onImageUpload}> <h5> Click or Drop here</h5></div>   }
  
        {imageList.map((image, index) => (
          <div key={index} className="image-item">
             <img src={ image['data_url']} alt="" />
         
       <IconButton onClick={() => onImageRemove(index)} className='flair-badge-wrapper' aria-label="remove"    size="small" >
<ClearIcon  aria-hidden="true"></ClearIcon>
</IconButton>
  
        </div> 
        ))} 
        </div>
      </div>
  
    
    )}
  </ImageUploading>
  <button type='submit'  className="save_changes">
    <h4>Save Changes</h4></button>
  
  </div>
  </form>
}
 
</div>

</Box>
</TabPanel>
</TabContext>
           </Box>
           </div>
    </div>
  )
}

export default Admin