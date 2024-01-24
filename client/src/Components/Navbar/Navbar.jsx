import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import decode from 'jwt-decode'

import './Navbar.css'
import logo from '../../Assets/logo-stackoverflow.png'
import search from '../../Assets/magnifying-glass-solid.svg'
import Avatar from '../../Components/Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = () => {

    // var User = JSON.parse(localStorage.getItem('Profile'))
    // var User = 1
    
    var User = useSelector((state) => (state.currentUserReducer))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token
        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
    },[dispatch])

    return (
        <nav className="main-nav">
            <div className="navbar">
                <Link to="/" className="nav-item nav-logo">
                    <img src={logo} alt="logo" width="120px" />
                </Link>
                <Link to="/About" className="nav-item nav-btn">About</Link>
                <Link to="/Products" className="nav-item nav-btn">Products</Link>
                <Link to="/ForMe" className="nav-item nav-btn">For Teams</Link>
                <form>
                    <input type="text" placeholder="Search..." ></input>
                    <img src={search} alt="logo" width="15" className="search-icon"/>
                </form>
                {   
                    User === null ? 
                        <Link to="/Auth" className="nav-item nav-link">Log in</Link> :
                        <div>
                            <Link to={`/Users/${User.result?._id}`} className="nav-item profile"><Avatar backgroundColor='#009dff' px="2px" py="8px" borderRadius="50%" color="white">{User.result.name.charAt(0).toUpperCase()}</Avatar></Link>
                            <button className="nav-item nav-link" onClick={handleLogout}>Log out</button>
                        </div>
                }
            </div>
        </nav>
    )
}
export default Navbar

