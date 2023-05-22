import React, { useContext } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
const Login = () => {
    const {logInMethod}= useContext(AuthContext)
    const handleSignIn =(event)=>{
        event.preventDefault()
        const form=event.target;
        const email =form.email.value;
        const password = form.password.value;
        console.log(email,password)
        logInMethod(email,password)
        .then(result=>{
            const logInUser =result.user;
            console.log(logInUser)
        })
        .catch(error=>{
            console.log(error.message)
        })
        event.target.reset()
    }
    return (
        <div className='form-container'> 
        <h4 className='form-title'> Please Login</h4>
        <form onSubmit={handleSignIn}>
            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="email"  required/>
            </div>
             <div className='form-control'>
                <label htmlFor="">Password</label>
                <input type="password" name="password" id="password"  required/>
            </div>
            <div >
                <input className='submit-btn' type="submit" value="LogIn" />
            </div>
        </form>
        <div className='small-link'>
                    <small >New to ema-john?
                        <span><Link to="/login">Create new Account</Link></span></small>
                 </div>
    </div>
    );
};

export default Login;