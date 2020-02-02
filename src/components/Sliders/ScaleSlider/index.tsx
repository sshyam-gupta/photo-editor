import React, { Component } from 'react'
import Slider from 'rc-slider'
import { connect } from 'react-redux'
import 'rc-slider/assets/index.css'

import './styles.css'
import { AppState } from '../../../types/store'
import { ActionType } from '../../../constants/actionType'

class ScaleSlider extends Component<any> {
  render() {
    return (
      <div>
        <div className="scale-slider-wrapper">
          <label htmlFor="">Scale: {this.props.scaleValue + '%'} </label>
          <Slider
            value={this.props.scaleValue}
            max={200}
            min={10}
            aria-labelledby="label"
            onChange={this.props.handleScaleChange}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    scaleValue: state.scaleValue
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleScaleChange: (value: number) => {
      dispatch({
        type: ActionType.HANDLE_SCALE_CHANGE,
        payload: value
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScaleSlider)
