import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import './styles.css'
import { AppState } from '../../types/store'
import { ActionType } from '../../constants/actionType'
import { FaCompressArrowsAlt, FaSun, FaSyncAlt, FaCropAlt, FaFont } from 'react-icons/fa'
const ACTIVE_COLOR = '#0099ff'

class Navbar extends Component<any, any> {
  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader: any = new FileReader()
      let file = event.target.files[0]
      reader.fileName = file.name

      reader.onloadend = (upload: any) => {
        this.props.handleUploadedFile(upload.target)
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    return (
      <div>
        <div
          className="sidebar-icons"
          onClick={() => this.props.handleShowResizeSection(this.props.showResizeSection)}
          data-tip="Resize image"
        >
          <FaCompressArrowsAlt color={this.props.showResizeSection ? ACTIVE_COLOR : ''} />
        </div>
        <div
          className="sidebar-icons"
          data-tip="Crop image"
          onClick={() => this.props.handleShowCropCanvas(this.props.showCropCanvas)}
        >
          <FaCropAlt color={this.props.showCropCanvas ? ACTIVE_COLOR : ''} />
        </div>

        <div
          className="sidebar-icons"
          data-tip="Change Brightness"
          onClick={() => this.props.handleShowSlider(this.props.showSlider)}
        >
          <FaSun color={this.props.showSlider ? ACTIVE_COLOR : ''} />
        </div>

        <div
          className="sidebar-icons"
          data-tip="Rotate"
          onClick={() => this.props.handleShowRotateSection(this.props.showRotateSection)}
        >
          <FaSyncAlt color={this.props.showRotateSection ? ACTIVE_COLOR : ''} />
        </div>

        <div
          className="sidebar-icons"
          data-tip="Add Text"
          onClick={() => this.props.handleShowTextField(this.props.showTextField)}
        >
          <FaFont color={this.props.showTextField ? ACTIVE_COLOR : ''} />
        </div>
        <ReactTooltip place="right" type="info" />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleShowResizeSection: (showResizeSection: boolean) => {
      dispatch({
        type: 'SHOW_RESIZE_SECTION',
        payload: showResizeSection
      })
    },
    handleShowSlider: (showSlider: boolean) => {
      dispatch({ type: ActionType.SHOW_SLIDER, payload: showSlider })
    },
    handleShowCropCanvas: (showCropCanvas: boolean) => {
      dispatch({ type: ActionType.SHOW_CROP_CANVAS, payload: showCropCanvas })
    },
    handleShowTextField: (showTextField: boolean) => {
      dispatch({ type: ActionType.SHOW_TEXT_FIELD, payload: showTextField })
    },
    handleShowRotateSection: (showRotateSection: boolean) => {
      dispatch({
        type: ActionType.SHOW_ROTATE_SECTION,
        payload: showRotateSection
      })
    }
  }
}

const mapPropsToState = (state: AppState) => {
  return {
    showResizeSection: state.showResizeSection,
    showCropCanvas: state.showCropCanvas,
    showSlider: state.showSlider,
    showTextField: state.showTextField,
    image: state.image,
    showRotateSection: state.showRotateSection
  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Navbar)
