import React, {useEffect, useState}from 'react';

const Contact = () => {

   const [userData, setUserData] = useState({name:"",email:"", phone:"",message:""});

   const userContact = async () =>{
       try{
        const res = await fetch('/getdata',{
         method :"GET",
         headers: {
            "Cotent-Type": "application/json"
         },
         
        });

        const data = await res.json();
        console.log(data);
        setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

        if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
        }

       }catch(err){
        console.log(err);
        
       }
   }
   
   useEffect(()=>{
  userContact();
   },[]);

  //  storing data in state
  const handleInputs = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
     setUserData({...userData, [name]:value});
  }

  // send the data to the backend
  const contactForm = async (e)=>{
    e.preventDefault();
    const {name,email,phone,message} = userData;
    
      const res = await  fetch('/contact',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,email,phone,message
        })
       });

       const data = await res.json();
       console.log(data);
       if(!data){
       window.alert("message not sent");
        console.log("message not sent");
       }else{
        window.alert("message sent successful");
        setUserData({...userData, message:""});
       }
  }

  return (
    <>
    
       <div className='contact '>
       <div className='container-fluid'>
           <div className='row'>
           <div className='col-lg-10 offset-lg-1 d-flex justify-content-between '>
           {/* phone */}
              <div className='contact_info_item d-flex  justify-content-start align-items-center '>
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className='contact_info_content'>
                       <div className='contact_info_title'>
                         Phone
                       </div>
                       <div className='contact_info_text'>
                         +9122222222222
                       </div>
                </div>
              </div>
              {/* email */}
              <div className='contact_info_item d-flex  justify-content-start align-items-center'>
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className='contact_info_content'>
                       <div className='contact_info_title'>
                         Email
                       </div>
                       <div className='contact_info_text'>
                         zainab@technical.com
                       </div>
                </div>
              </div>

              {/* address */}
              <div className='contact_info_item d-flex  justify-content-start align-items-center'>
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className='contact_info_content'>
                       <div className='contact_info_title'>
                         Address
                       </div>
                       <div className='contact_info_text'>
                        West Bengal, Kolkata
                       </div>
                </div>
              </div>
           </div>
           </div>
       </div>

       </div>


          {/* contactus form */}

          <div className='contact_form'>
          <div className='container'>
               <div className='row'>
                  <div className='col-lg-10 offset-lg-1'>
                    <div className='contact_form_container '>
                           <div className='contact_form_title'>
                                  Get in Touch
                           </div>

                           <form method="POST" id="contact_form">
                              <div className='contact_form d-flex justify-content-between align-items-between mt-4'>
                              <input type="text" id="contact_form_id" className='contact_form_name input_field'  
                              name="name"
                              onChange={handleInputs}
                              value={userData.name}
                              placeholder='Your Name' required="true"/>

                              <input type="email" id="contact_form_id" className='contact_form_email input_field'  
                              name="email"
                              onChange={handleInputs}
                              value={userData.email}
                              placeholder='Your Email' required="true"/>

                              <input type="number" id="contact_form_id" className='contact_form_phone input_field'  
                              name="phone"
                              onChange={handleInputs}
                              value={userData.phone}
                              placeholder='Your Phone Number' required="true"/>
                              </div>

                              <div className='contact_form_text mt-5'>
                                <textarea className="text_field contact_form_message" 
                                name="message"
                                onChange={handleInputs}
                                value={userData.message}
                                placeholder='Message'
                                 cols="50" rows="5"></textarea>
                              </div>

                               <div className='contact_form_button'>
                                 <button type='submit' className='button contact_submit_button form-submit' onClick={contactForm}>Send Message</button>
                               </div>

                           </form>
                    </div>

                  </div>

               </div>
          </div>

          </div>

        
    </>
  )
}

export default Contact;
