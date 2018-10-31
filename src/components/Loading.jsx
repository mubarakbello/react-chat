import React from 'react'
import loadingImage from '../assets/loading-anime.gif'

const Loading = (props) => (
  <div className="Loading container-fluid">
    <div className="row justify-content-center">
      <div className="col-md-8 col-sm-10 col-lg-6">
        <div className="row justify-content-center">
          <div className="col">
            <img src={loadingImage} className="img-fluid mx-auto d-block" alt="Loading" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col text-center">
            <div className="alert alert-light" role="alert">
              <span className="">Loading {props.text}... </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Loading