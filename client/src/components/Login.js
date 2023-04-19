import React, { useContext, useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import loginimg from "../images/login.jpg";

import { UserContext } from '../App';

const Login = () => {
const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const loginUser = async (e)=>{
       e.preventDefault();

      const res = await fetch('/signin',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           email,
           password
        })
      });
      
      const data = res.json();
      if(res.status === 400||!data){
        window.alert("Invalid Credential");
        
      }else{
        
        dispatch({type:"USER", payload:true});

        window.alert("Login successful");
        navigate("/");
      }
    }

  return (
    <>
       <section className='sign-in'>
        <div className='containre mt-5'>
         <div className='signup-content'>
         <div className='signup-image'>
                <figure>
                  <img src= {loginimg} alt="registration pic" />
                </figure>
                 <NavLink to="/signup" className="signup-image-link"> Creat an account</NavLink>
                </div>

           <div className='signup-form'>
           <h2 className='form-title'>Sign in </h2>
                <form method="POST" className="register-form">

          

                  <div className='form-group'>
                  <label htmlFor="email">
                  <i class="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete='off'
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)} 
                  placeholder='Enter Your Email' />
                  </div>

                         

                  <div className='form-group'>
                  <label htmlFor="password">
                  <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete='off' 
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)} 
                  placeholder='Enter Your Password' />
                  </div>

                 
                   <div className='form-group form-button'>
                       <input type="submit" name="signin"  id="signin" className='form-submit' 
                       value="Sign in" onClick={loginUser}/>

                   </div>
                </form>
                </div>
             
                </div>
            </div>

        </section>
    </>
  )
}

export default Login;
