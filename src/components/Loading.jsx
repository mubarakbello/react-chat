import React from 'react'
import loadingImage from '../assets/bars.svg'

const Loading = (props) => (
  <div className={`Loading-${props.size}`}>
    <img src={loadingImage} alt="Loading"/>
  </div>
)

export default Loading