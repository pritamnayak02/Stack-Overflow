import React from 'react'
import '../../App.css'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import HomeMainbar from '../../Components/HomeMainbar/HomeMainbar'

const Questions = () => {
  return (
    <div className="home-container-1">
      <div>
        <LeftSidebar/>
      </div>
      <div className="home-container-2">
        <HomeMainbar/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Questions
