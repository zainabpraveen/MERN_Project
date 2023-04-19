import React, { useEffect, useState } from 'react'


const Home = ()=> {

     const [userName, setUserName] = useState('');
     const [show, setShow] =  useState(false);
     const  userHome = async ()=>{
      try{
        const res = await fetch('/getdata',{
                method:"GET",
                headers:{
                  "Content-Type": "application/json"
                },
          });
        const data =await res.json();
        // console.log(data); 
        setUserName(data.name);
        setShow(true);

        
      }catch(err){
        console.log(err);
      }
     }

     useEffect(()=>{
       userHome();
     },[])
     
  return (
    <>
      <div className='home-page'>
         <div className='home-div'>
            <p>WELCOME</p>
            <h1>{ userName}</h1>
            <h2>{show? 'Happy to see you again':'We Are The MERN Developer'}</h2>
         </div>
      </div>
    </>
  )
}

export default Home;
