import React from 'react'
import { connect } from 'react-redux'
import { ActionType } from '../../../constants/actionType'
import { AppState } from '../../../types/store'
import Slider from 'rc-slider'

class ContrastSlider extends React.Component<any> {
  render() {
    return (
      <div>
        {this.props.showSlider ? (
          <div style={{ width: '200px' }}>
            <div id="label" style={{ color: '#f1f1f1' }}>
              Contrast: {Math.floor(this.props.value)}
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
    value: state.contrastSliderValue,
    showSlider: state.showSlider
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChange: (value: number) => {
      dispatch({
        type: ActionType.HANDLE_CONTRAST_CHANGE,
        payload: value
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContrastSlider)
