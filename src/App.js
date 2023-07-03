
import { useEffect, useState } from 'react';
import './App.css';
import Admin from './components/admin';
import Signin from './components/signin';
import db, { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/loader';

function App() {
  const user = useSelector(selectUser);
  const [events, setEvents] = useState();
  const [general, setGeneral] = useState();
  const [images, setImages] = useState();
  const [cate, setCate] = useState();
  
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        
      }else{
        dispatch(logout());
      }
    });

    return () =>{
      unsubscribe();
    }
  },[dispatch])
useEffect(() =>{
  const unsubscribe =  db.collection('events')
  .onSnapshot((querySnapshot) => {
    const event  = {};
    querySnapshot.forEach((doc) => {
        event[doc.id] = doc.data()
    });
    setEvents(event)
});

  return () =>{
    unsubscribe();

  }
  
      },[])
      useEffect(() =>{
        const unsubscribe =  db.collection('general')
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              setGeneral(doc.data())
          });
          
      });
      
        return () =>{
          unsubscribe();
      
        }
        
            },[])
            useEffect(() =>{
              const unsubscribe =  db.collection('images')
              .onSnapshot((querySnapshot) => {
                const image  = {};
                querySnapshot.forEach((doc) => {
                    image[doc.id] = doc.data()
                });
                setImages(image)
            });
            
              return () =>{
                unsubscribe();
            
              }
              
                  },[])
                  useEffect(() =>{
                    const unsubscribe =  db.collection('categories')
                    .onSnapshot((querySnapshot) => {
                      const cate = {};
                      querySnapshot.forEach((doc) => {
                          cate[doc.id] = doc.data()
                      });
                      setCate(cate)
                  });
                  
                    return () =>{
                      unsubscribe();
                  
                    }
                        },[])
                        console.log(cate)
                  
  return (
    <div className="App">
           {!general || !events || !images?
      <Loader/>:<>
      {user?<Admin events={events} general={general} imagesv1={images} categories={cate} />:<Signin/>
    }</>}


    </div>
  );
}

export default App;
