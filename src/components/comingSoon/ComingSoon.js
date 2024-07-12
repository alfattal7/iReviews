import React from 'react'
import Error from'../assets/error-404.jpg'
import './ComingSoon.css'
const ComingSoon = () => {
  return (
    <>
    <div className='center'>
       <h5 >coming Soon 😉</h5>
      <img className='ErrorImg'
       src={Error}
        alt='Error'></img>
    </div>
    </>
  )
}

export default ComingSoon