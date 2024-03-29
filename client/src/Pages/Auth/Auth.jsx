import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import logo from '../../Assets/stackoverflow.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (e) => { 
    e.preventDefault()
    if(!email || !password){
        alert('Enter email and password')
    }
    if(isSignup){
        if(!name){
            alert("Enter a name to continue")
        }
        dispatch(signup({ name, email, password}, navigate))
    }
    else{
        dispatch(login({ email, password}, navigate))
    }
  }

  return (
    <section class="auth-section">
        { isSignup && <AboutAuth/> }
        <div className="auth-container-1">
            { !isSignup && <img src={logo} alt="logo" className="login-logo" width="50" /> }
            <form onSubmit={handleSubmit}>
                {
                    isSignup && (
                        <label htmlFor='name'>
                            <h4>Display Name</h4>
                            <input type="text" id="name" name='name' onChange={(e) => {setName(e.target.value)}}/>
                        </label>
                    )
                }
                <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" name='email'  id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="password">
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <h4>Password</h4>
                        { !isSignup && <h4 style={{color: "#007ac6", fontSize:"13px"}}>forgot password?</h4> }
                    </div>
                    <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
                    { isSignup && <p style={{color: "#666767", fontSize:"13px"}}>Password must contain at least eight<br/>characters, including at least 1 letter<br/> and number.</p>}
                </label>
                {
                    isSignup && (
                        <label htmlFor='check'>
                            <input type="checkbox" id='check' style={{width: "10px", height: "10px"}}/>
                            <p style={{fontSize:"13px"}}>Opt-in to receive occasional,<br/> product updates, user research<br/> invitations, company announcements,<br/> and digests.</p>
                        </label>
                    )
                }
                <button type="submit" className='auth-btn'>{ isSignup ? 'Sign up' : 'Log in'}</button>
                {
                    isSignup && (
                        <p style={{color: "#666767", fontSize:"13px"}}>
                            By clicking "Sign up", you agree to <br/>our
                            <span style={{color: "#007ac6"}}> terms of service</span>,
                            <span style={{color: "#007ac6"}}> privecy policy<br/></span> and
                            <span style={{color: "#007ac6"}}> coockie policy</span>
                        </p>
                    )
                }
            </form>
            <p>
                { isSignup ? 'already have an account' : 'don\'t have any account'}
                <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? 'Log in' : 'Sign up'}</button>
            </p>
        </div>
    </section>
  )
}

export default Auth
