import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
const SignUp = () => {
    const [error,setError]=useState('');
    const {creatUser} =useContext(AuthContext)
    const handleSignUp =(event)=>{
        event.preventDefault()
        const form=event.target;
        const email =form.email.value;
        const password = form.password.value;
        const confirm =form.confirm.value;
        console.log(email,password,confirm)
        if(password !== confirm){
            setError('your password did not match')
            return
        } else if(password.length <6){
            setError('password must be 6 character or longer')
            return
        }
      creatUser(email,password)
      .then(result=>{
        const signUpUser =result.user;
        console.log(signUpUser)
      })
      .catch(error=>{
        console.log(error.message)
        setError(error.message)
      })
        event.target.reset()
        setError('')
    }
    return (
        <div className='form-container'> 
            <h4 className='form-title'> sign up</h4>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="email"  required/>
                </div>
                 <div className='form-control'>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="password"  required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm"  required/>
                </div>
                <div >
                    <input className='submit-btn' type="submit" value="Sign Up" />
                </div> 
            </form>
            <div className='small-link'>
                    <small >already have an account ?
                        <span><Link to="/login">Login</Link></span></small>
             </div>
             <p className='form-error'>{error}</p>
        </div>
    );
};

export default SignUp;