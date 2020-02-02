import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import './styles.css'
import { AppState } from '../../types/store'
import { ActionType } from '../../constants/actionType'

const cardSource = {
  canDrag({ flag }: { flag: boolean }) {
    return !flag
  },
  isDragging(props: any, monitor: any) {
    return monitor.getItem().id === props.id
  },

  beginDrag(props: any, monitor: any) {
    const item = { id: props.id, left: props.left, top: props.top }
    return item
  }
}

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class CropElement extends Component<any, any> {
  overlappingDiv: any
  constructor(props: any) {
    super(props)
    this.overlappingDiv = React.createRef()
    this.state = {
      clickedResizeRegion: false,
      cursor: null
    }
  }

  handleMouseDown = (e: any) => {
    let mouseXInCropElement = e.nativeEvent.offsetX
    let mouseYInCropElement = e.nativeEvent.offsetY

    if (mouseXInCropElement < 10 && mouseYInCropElement < 10) {
      console.log('LT')
      this.props.setCropDivClickedResizeRegion('LT')
      this.props.setCropDivInitialCoor(mouseXInCropElement, mouseYInCropElement)
    } else if (this.props.cropDivWidth - mouseXInCropElement < 10 && mouseYInCropElement < 10) {
      console.log('RT')
      this.props.setCropDivClickedResizeRegion('RT')
      this.props.setCropDivInitialCoor(mouseXInCropElement, mouseYInCropElement)
    } else if (
      this.props.cropDivWidth - mouseXInCropElement < 10 &&
      this.props.cropDivHeight - mouseYInCropElement < 10
    ) {
      console.log('RB')
      this.props.setCropDivClickedResizeRegion('RB')
      this.props.setCropDivInitialCoor(mouseXInCropElement, mouseYInCropElement)
    } else if (mouseXInCropElement < 10 && this.props.cropDivHeight - mouseYInCropElement < 10) {
      console.log('LB')
      this.props.setCropDivClickedResizeRegion('LB')
      this.props.setCropDivInitialCoor(mouseXInCropElement, mouseYInCropElement)
    }
  }

  handleMouseUp = (e: any) => {
    let mouseXInCropElement = e.nativeEvent.offsetX
    let mouseYInCropElement = e.nativeEvent.offsetY

    let diffX = mouseXInCropElement - this.props.cropDivClickInitialX
    let diffY = mouseYInCropElement - this.props.cropDivClickInitialY

    if (this.props.cropDivClickedResizeRegion === 'RB') {
      this.props.setCropDivSize('RB', diffX, diffY)
    } else if (this.props.cropDivClickedResizeRegion === 'RT') {
      this.props.setCropDivLeftAndTop(diffY, 0)
      this.props.setCropDivSize('RT', diffX, -diffY)
    } else if (this.props.cropDivClickedResizeRegion === 'LT') {
      this.props.setCropDivLeftAndTop(diffY, diffX)
      this.props.setCropDivSize('LT', -diffX, -diffY)
    } else if (this.props.cropDivClickedResizeRegion === 'LB') {
      this.props.setCropDivLeftAndTop(0, diffX)
      this.props.setCropDivSize('LT', -diffX, diffY)
    }
  }

  handleMouseMove = (e: any) => {
    let mouseXInCropElement = e.nativeEvent.offsetX
    let mouseYInCropElement = e.nativeEvent.offsetY
    if (mouseXInCropElement < 10 && mouseYInCropElement < 10) {
      this.setState({ cursor: 'se-resize' })
    } else if (this.props.cropDivWidth - mouseXInCropElement < 10 && mouseYInCropElement < 10) {
      this.setState({ cursor: 'ne-resize' })
    } else if (
      this.props.cropDivWidth - mouseXInCropElement < 10 &&
      this.props.cropDivHeight - mouseYInCropElement < 10
    ) {
      this.setState({ cursor: 'nw-resize' })
    } else if (mouseXInCropElement < 10 && this.props.cropDivHeight - mouseYInCropElement < 10) {
      this.setState({ cursor: 'sw-resize' })
    } else {
      this.setState({ cursor: null })
    }
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    if (isDragging) {
      return connectDragSource(<div />)
    }
    return connectDragSource(
      <div
        className="crop-div"
        ref={this.overlappingDiv}
        id={this.props.id}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        style={{
          width: this.props.cropDivWidth,
          height: this.props.cropDivHeight,
          cursor: this.state.cursor || 'move',
          left: this.props.left,
          top: this.props.top
        }}
      />
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    height: state.height,
    width: state.width,
    cropDivClickedResizeRegion: state.cropDivClickedResizeRegion,
    cropDivWidth: state.cropDivWidth,
    cropDivHeight: state.cropDivHeight,
    cropDivClickInitialX: state.cropDivClickInitialX,
    cropDivClickInitialY: state.cropDivClickInitialY
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCropDivClickedResizeRegion: (flag: boolean) => {
      dispatch({ type: ActionType.SET_RESIZE_REGION_CLICKED, payload: flag })
    },
    setCropDivInitialCoor: (x: any, y: any) => {
      dispatch({ type: ActionType.SET_CROP_DIV_INITIAL_COOR, payload: { x, y } })
    },
    setCropDivSize: (region: any, width: any, height: any) => {
      dispatch({
        type: ActionType.SET_CROP_DIV_SIZE,
        payload: { region, width, height }
      })
    },
    setCropDivLeftAndTop: (top: any, left: any) => {
      dispatch({
        type: ActionType.SET_CROP_DIV_LEFT_AND_TOP,
        payload: { top, left }
      })
    }
  }
}

export default DragSource('crop-div', cardSource, collect)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CropElement)
)
