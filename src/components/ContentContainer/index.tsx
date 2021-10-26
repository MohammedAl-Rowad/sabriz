import TopNavigation from '../TopNavigation'
import { BsPlusCircleFill } from 'react-icons/bs'
// import { useState } from 'react';

const ContentContainer = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list h-screen"></div>
      <BottomBar />
    </div>
  )
}

const BottomBar = () => (
  <div className="bottom-bar">
    <PlusIcon />
    <input
      type="text"
      placeholder="Enter message..."
      className="bottom-bar-input"
    />
  </div>
)

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
  />
)

export default ContentContainer
