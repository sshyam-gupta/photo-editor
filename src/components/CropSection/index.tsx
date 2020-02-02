import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles.css'
import { ActionType } from '../../constants/actionType'
import { AppState } from '../../types/store'

class CropSection extends Component<any, any> {
  render() {
    if (this.props.showCropCanvas) {
      return (
        <div className="crop-section-wrapper">
          <div className="crop-section">
            <div className="left-section">
              <label className="label label-resize" htmlFor="resize-width">
                Width:
              </label>
              <label className="label label-resize" htmlFor="resize-height">
                Heigth:
              </label>
            </div>

            <div className="right-section">
              <label htmlFor="">{this.props.cropDivWidth}</label>

              <label htmlFor="">{this.props.cropDivHeight}</label>
            </div>
          </div>
          <button
            className="btn btn-primary btn-block btn-crop-section"
            onClick={() => this.props.handleCropImage(this.props.cropImage)}
          >
            Crop
          </button>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    cropDivWidth: state.cropDivWidth,
    cropDivHeight: state.cropDivHeight,
    cropDivTop: state.cropDivTop,
    cropDivLeft: state.cropDivLeft,
    showCropCanvas: state.showCropCanvas,
    cropImage: state.cropImage
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleCropImage: (cropImage: any) => {
      dispatch({ type: ActionType.CROP_IMAGE, payload: cropImage })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CropSection)
