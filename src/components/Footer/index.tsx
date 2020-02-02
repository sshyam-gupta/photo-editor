import React from 'react'

import ScaleSlider from '../Sliders/ScaleSlider'

import './styles.css'
import { connect } from 'react-redux'
import { AppState } from '../../types/store'

const Footer = (props: any) => {
  return (
    <div className="footer-wrapper">
      <div className="left-panel">
        <div className="info-wrapper">
          <label htmlFor="">Size:</label>
          {props.width + ' x ' + props.height}
        </div>
      </div>
      <div className="center-panel">{!props.showCropCanvas && <ScaleSlider />}</div>

      <div className="right-panel">
        {/* <a href="" target="_blank"> */}
        FORK ME!
        {/* </a> */}
      </div>
    </div>
  )
}

const mapPropsToState = (state: AppState) => {
  return {
    width: state.width,
    height: state.height,
    imageName: state.imageName
  }
}

export default connect(
  mapPropsToState,
  {}
)(Footer)
