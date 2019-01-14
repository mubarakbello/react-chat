import React, {Fragment} from 'react'
import largeLoadingImage from '../assets/largebars.svg'
import mediumLoadingImage from '../assets/mediumbars.svg'
import smallLoadingImage from '../assets/smallbars.svg'

const Loading = (props) => (
  <div className={`Loading-${props.size}`}>
    {props.size === 'large' && <img src={largeLoadingImage} alt="Loading"/>}
    {props.size === 'medium' && <img src={mediumLoadingImage} alt="Loading"/>}
    {props.size === 'small' && (
      <Fragment>
        <span>
          <img src={smallLoadingImage} alt="Loading"/>
        </span>
        <span>Fetching {props.text}...</span>
      </Fragment>
    )}
  </div>
)

export default Loading