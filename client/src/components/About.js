import React, { useEffect ,useState} from 'react'
import manpic from '../images/c10-compressed.jpg';
import zainabpic from '../images/zainab.jpg';
import  {useNavigate} from 'react-router-dom';

const About = () => {

   const navigate = useNavigate();
   const [userData, setUserData] = useState({});

   const callAboutPage = async () =>{
       try{
        const res = await fetch('/about',{
         method :"GET",
         headers: {
            Accept: "application/json",
            "Cotent-Type": "application/json"
         },
         credentials:"include"
        });

        const data = await res.json();
        console.log(data);
        setUserData(data);

        if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
        }

       }catch(err){
        console.log(err);
        navigate("/login")
       }
   }
   
   useEffect(()=>{
  callAboutPage();
   },[]);



  return (
   <>
      <div className='container emp-profile'>
      <form method="GET">
        <div className='row'>
            <div className='col-md-4'>
            <div className='profile-img'>
            <img src={userData.name==="Zainab"?zainabpic:manpic} alt="employeepic" />
            </div>
            </div>  
            <div className='col-md-6'>
            <div className='profile-head'>
             <h5>{userData.name}</h5>
               <h6>{userData.work}</h6>
               <p className='pofile-rating mt-3 mb-5'>RANKINGS : <span>1/10</span> </p>

               <ul className='nav nav-tabs' role='tablist'>
               <li className='nav-item'>
                  <a  className='nav-link active'  id="home-tab" 
                  data-toggle="tab" href="#home" role="tab" aria-controls='home' aria-selected="true">About</a>
               </li>
               <li className='nav-item'>
               <a   className='nav-link '              id="profile-tab" 
                  data-toggle="tab"  href="#profile" role="tab" aria-controls='profile' aria-selected="true">Timeline</a>
               </li>
               </ul>
              </div>
            </div> 

            <div className='col-md-2' >
            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
           </div>
         </div>  

         <div className='row'>
         {/* left side url */}

         <div className='col-md-4'>
               <div className='profile-work'>
               <p> WORK LINKS</p>
               <a href="https://www.youtube.com/" target="_Loren"> Youtube</a> <br />
               <a href="https://www.youtube.com/" target="_Loren">Instagram</a> <br />
               <a href="https://www.youtube.com/" target="_Loren">Zainab Technical</a><br />
               <a href="https://www.youtube.com/" target="_Loren">WebsiteGitHubMERN Dev</a><br />
               <a href="https://www.youtube.com/" target="_Loren">Web Developer</a><br />
               <a href="https://www.youtube.com/" target="_Loren">Software Engineer</a><br />
            </div>
         </div>
         {/* right side data toggle */}
          <div className='col-md-8 pl-5 about-info'>
              <div className='tab-content profile-tab' id="myTabContent">
               <div className='tab-pane fade show active' id="home" role='tabpanel' aria-labelledby='home-tab'>

               <div className='row'>

                  <div className='col-md-6'>
                     <label > User ID</label>
                  </div>

                  <div className='col-md-6'>
                    <p>123456788765t4r3e</p>
                  </div>

               </div>

               <div className='row mt-3'>
                  <div className='col-md-6'>
                     <label > Name</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{userData.name}</p>
                  </div>
               </div>

               <div className='row mt-3'>
                  <div className='col-md-6'>
                     <label > Email</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{userData.email}</p>
                  </div>
               </div>

               <div className='row mt-3'>
                  <div className='col-md-6'>
                     <label > Phone</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{userData.phone}</p>
                  </div>
               </div>

               <div className='row mt-3'>
                  <div className='col-md-6'>
                     <label > Profession</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{userData.work}</p>
                  </div>
               </div>
             </div>
               <div className='tab-pane fade' id="profile" role='tabpanel' aria-labelledby='profile-tab'>
     
               <div className='row'>
                  <div className='col-md-6'>
                     <label > Experience</label>
                  </div>
                  <div className='col-md-6'>
                    <p>Expert</p>
                  </div>
               </div>

               <div className='row mt-3'>
                  <div className='col-md-6'>
                     <label > Hourly Rate</label>
                  </div>
                  <div className='col-md-6'>
                    <p>10$/hr</p>
                  </div>
               </div>

               <div className='row mt-3'>
                  <div className='col-md-6'>
                     <label > Total Projects</label>
                  </div>
                  <div className='col-md-6'>
                    <p>202</p>
                  </div>
               </div>


               </div>
              </div>


          </div>

         </div>

      </form>
      </div>
   </>
  )
};

export default About;
