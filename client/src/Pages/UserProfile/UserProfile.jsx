import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import Avatar from '../../Components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UserProfile.css'

const UserProfile = () => {

    const { id } = useParams()
    const user = useSelector((state) => state.usersReducer)
    const currentProfile = user.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)

    const [ Switch, setSwitch ] = useState(false)

    return (
        <div className='home-container-1'>
            <div>
                <LeftSidebar/>
            </div>
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color='white' fontSize='60px' px='25px' py='45px'>
                                {currentProfile?.name.charAt(0).toUpperCase()} 
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake}/> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ): (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile
