import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles.css'
import { AppState } from '../../types/store'
import Slider from 'rc-slider'
import { ActionType } from '../../constants/actionType'
import { FaRedo, FaUndo } from 'react-icons/fa'

class RotateSection extends Component<any> {
  render() {
    const { classes = {} } = this.props

    if (this.props.showRotateSection) {
      return (
        <div className={classes.root}>
          <div className="flip-button">
            <button
              className="btn btn-primary"
              onClick={() => this.props.toggleHorizontalFlip(this.props.horizontalFlip)}
            >
              Horizontal Flip
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.props.toggleVerticalFlip(this.props.verticalFlip)}
            >
              Vertical Flip
            </button>
          </div>

          <div className="rotation-buttons">
            <button className="btn btn-primary" onClick={this.props.rotate90DegreeLeft}>
              <FaUndo />
            </button>

            <button className="btn btn-primary" onClick={this.props.rotate90DegreeRight}>
              <FaRedo />
            </button>
          </div>
          <label htmlFor="" style={{ margin: '3px 0px', color: '#f1f1f1' }}>
            Fine-Tune Rotation:
          </label>
          <Slider
            className={classes.slider}
            value={this.props.inactValue}
            max={45}
            min={-45}
            step={0.1}
            onAfterChange={this.props.resetRotate}
            aria-labelledby="label"
            onChange={this.props.handleFineTuneRotate}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleHorizontalFlip: (horizontalFlip: any) => {
      dispatch({
        type: ActionType.TOGGLE_HORIZONTAL_FLIP,
        payload: horizontalFlip
      })
    },
    toggleVerticalFlip: (verticalFlip: any) => {
      dispatch({
        type: ActionType.TOGGLE_VERTICAL_FLIP,
        payload: verticalFlip
      })
    },
    rotate90DegreeLeft: (e: any) => {
      dispatch({
        type: ActionType.ROTATE_90_DEGREE_LEFT,
        payload: -90
      })
    },
    rotate90DegreeRight: (e: any) => {
      dispatch({
        type: ActionType.ROTATE_90_DEGREE_RIGHT,
        payload: 90
      })
    },
    handleFineTuneRotate: (value: number) => {
      dispatch({
        type: ActionType.HANDLE_FINE_TUNE_ROTATE,
        payload: value
      })
    },
    resetRotate: () => {
      dispatch({
        type: ActionType.RESET_ROTATE
      })
    }
  }
}

const mapPropsToState = (state: AppState) => {
  return {
    showRotateSection: state.showRotateSection,
    horizontalFlip: state.horizontalFlip,
    fineTuneRotate: state.fineTuneRotate,
    inactValue: state.inactValue
  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(RotateSection)
