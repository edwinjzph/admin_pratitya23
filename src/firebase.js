import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';


const firebaseConfig = {
    apiKey: "AIzaSyBquUggKZ80vwCgElTFNTp-6ANNkZ7mwdU",
    authDomain: "pratitya-ba958.firebaseapp.com",
    projectId: "pratitya-ba958",
    storageBucket: "pratitya-ba958.appspot.com",
    messagingSenderId: "1066761384201",
    appId: "1:1066761384201:web:3e190f8d8e026859cfa3d8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp)
  const db = firebaseApp.firestore();
  const auth=firebase.auth();

  export {auth ,storage};
  export default db;

  export const createEvent = async (data) => {
    if(!data) return
 var uuid;
    const {   Event_name, description,
    image,
    rules,
    imageurl,
    head_name,
    PhoneNumber,
    venue,
    categorieid,
    price,
    link,
    date,
    eventid,
    registration,
    active} =data
    if(eventid===""){
      uuid =uuidv4()
    }else{
uuid= eventid;
    }
    if(imageurl===""){
    const userRef = db.doc(`events/${uuid}`);
      const imageref = ref(storage,`Eventimages/${Event_name + uuidv4()}`)
      uploadBytes(imageref,image).then(  (snapshot )=>{
        getDownloadURL(snapshot.ref).then( async (url)=>{
          console.log("image_uploaded")
          try {
            await userRef.set({
              Event_name: Event_name,
              rules:rules,
              description:description,
              link:link,
              active:active,
              price: parseInt(price),
              categorieid:categorieid,
              imageurl: url,
              date:date,
              registration:registration,
              venue:venue,
              head_name:head_name,
              PhoneNumber:PhoneNumber,
              createdAt: new Date(),
            });
          } catch (error) {
            console.log('Error in creating user', error);
          }
        })
      }) }else{
        try {
          const userRef = db.doc(`events/${uuid}`);
          await userRef.update({
            Event_name: Event_name,
            rules:rules,
            description:description,
            link:link,
            active:active,
            date:date,
            categorieid:categorieid,
            registration:registration,
            price: parseInt(price),
            venue:venue,
            head_name:head_name,
            PhoneNumber:PhoneNumber,
            imageurl: imageurl,
           
          });
        } catch (error) {
          console.log('Error in creating user', error);
        }
      }
    
  }
  
  export const createGeneral = async (data) => {
    if(!data) return
    const {      eventname,
      eventdate,
      logo,
      apm1,
      apm1phn,
      apm2,
      apm2phn,
      themeColor,
      pm,
      pmphn,
      about,
      convenor,
      convenorphn,
      generalmail,
      instaurl,
      favicon,
      registration, } =data
    const userRef = db.doc("general/oJfXmDsFan1ToHetyvP5");
  
          try {
            await userRef.update({
              eventname: eventname,
              eventdate: eventdate,
              logo: logo,
              apm1: apm1,
              apm1phn: apm1phn,
              apm2: apm2,
              pm:pm,
              pmphn:pmphn,
              apm2phn: apm2phn,
              themeColor: themeColor,
              about: about,
              convenor: convenor,
              convenorphn: convenorphn,
              generalmail: generalmail,
              instaurl: instaurl,
              favicon: favicon,
              registration: registration,
              createdAt: new Date(),
            });
          } catch (error) {
            console.log('Error', error);
          }
  
  }
  export const createcategorie = async (data) => {
    if(!data) return
    const uuid =uuidv4()
    const {categorie_name} =data
    const userRef = db.doc(`categories/${uuid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
      try {
        await userRef.set({
          cate: categorie_name,
        });
      } catch (error) {
        console.log('Error in adding user', error);
      }
}
  }
  
  export const createimage = async (data) => {
    if(!data) return
    console.log(data)
   const uuid =uuidv4()
    const userRef = db.doc(`images/${uuid}`);
    const imageref = ref(storage,`throwback/${data[0].file.name + uuidv4()}`)
    uploadBytes(imageref,data[0].file).then(  (snapshot )=>{
      getDownloadURL(snapshot.ref).then( async (url)=>{
        console.log("image_uploaded")
        try {
          await userRef.set({
            img: url    
          });
        } catch (error) {
          console.log('Error', error);
        }
      })
    })

    
  }