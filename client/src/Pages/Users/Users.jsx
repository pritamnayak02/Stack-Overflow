import React from 'react'
import { useLocation } from 'react-router-dom'

import './Users.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import UsersList from './UsersList'

const Users = () => {

    const location = useLocation()

    return (
        <div className='home-container-1'>
            <div>
                <LeftSidebar />
            </div>
            <div className="home-container-2" style={{marginTop: "25px"}}>
                <h1 style={{fontWeight: "400"}}>Users</h1>
                <UsersList/>
            </div>
        </div>
    )
}

export default Users