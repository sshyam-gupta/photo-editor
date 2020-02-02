import React from 'react'
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import { AppState } from '../../../types/store'
import { ActionType } from '../../../constants/actionType'

class BrightnessSlider extends React.Component<any> {
  render() {
    return (
      <div>
        {this.props.showSlider ? (
          <div style={{ width: '200px' }}>
            <div id="label" style={{ color: 'white' }}>
              Brightness: {Math.floor(this.props.value)}
            </div>
            <Slider
              value={this.props.value}
              aria-labelledby="label"
              onChange={this.props.handleChange}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    value: state.brightnessSliderValue,
    showSlider: state.showSlider
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChange: (value: number) => {
      dispatch({
        type: ActionType.HANDLE_BRIGHTNESS_CHANGE,
        payload: value
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrightnessSlider)
