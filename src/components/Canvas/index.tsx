import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import './styles.css'
import CropElement from '../CropElement'
import { AppState, Region } from '../../types/store'
import {
  setWidthAndHeight,
  downloadImage,
  toggleHorizontalFlip,
  toggleVerticalFlip,
  resetRotate,
  setImgURL,
  handleScaleChange,
  setCropDivSize,
  setCropDivLeftAndTop,
  setCropDivLeftAndTopPlain,
  handleFileChange
} from "../../store/actions/canvas";

interface State {
  imageName: string;
  image: any;
  height: number;
  width: number;
  brightnessValue: number;
  contrastValue: number;
  blurValue: number;
  saturateValue: number;
  showCropCanvas: boolean;
  textInput: string;
  showTextField: boolean;
  inputColor: string;
  textSize: number;
  downloadImageFlag: boolean;
  scaleValue: number;
  horizontalFlip: boolean;
  verticalFlip: boolean;
  rotateCanvas: number;
  fineTuneRotate: number;
  showRotateSection: boolean;
  canvasDivHeight: number;
  canvasDivWidth: number;
  cropDivClickedResizeRegion: Region | boolean;
  cropDivClickInitialX: number;
  cropDivClickInitialY: number;
  cropDivWidth: number;
  cropDivHeight: number;
  cropDivTop: number;
  cropDivLeft: number;
  cropImage: boolean;
  showSlider: boolean;
}

interface Props {
  setWidthAndHeight(data: { width: number, height: number }): void

  downloadImage(imgUrl: string): void
  setImgURL(imgUrl: string): void

  toggleHorizontalFlip(flag: boolean): void
  toggleVerticalFlip(flag: boolean): void
  resetRotate(): void
  handleScaleChange(scale: number): void

  setCropDivSize(data: { region: Region, width: number, height: number }): void
  setCropDivLeftAndTop(data: { top: number, left: number }): void
  setCropDivLeftAndTopPlain(data: { top: number, left: number }): void
  handleUploadedFile(data: { result: string, fileName: string, width: number, height: number }): void
}

interface CanvasProps extends State, Props {
  connectDropTarget: any
}


class Canvas extends Component<CanvasProps> {
  canvasRef = React.createRef<HTMLCanvasElement>()

  componentDidMount() {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()

      // SAVE TO LOCAL STORAGE
      const node = this.canvasRef.current
      let imgURL = node!.toDataURL('image/png')
      localStorage.removeItem('image')
      localStorage.setItem(
        'image',
        JSON.stringify({
          name: this.props.imageName,
          url: imgURL,
          date: new Date()
        })
      )
    })
  }

  componentDidUpdate(prevProps: CanvasProps) {
    if (
      prevProps.showCropCanvas !== this.props.showCropCanvas ||
      prevProps.showRotateSection !== this.props.showRotateSection ||
      prevProps.showSlider !== this.props.showSlider ||
      prevProps.showTextField !== this.props.showTextField
    ) {
    } else {
      var img = new Image()
      img.src = this.props.image
      img.onload = () => this.drawCanvas(img)
    }
  }

  updateStateOnDrop(monitor: any) {
    const { cropDivWidth, width, cropDivHeight, height } = this.props;
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
    let left = Math.round(item.left + delta.x)
    let top = Math.round(item.top + delta.y)

    if (left <= 0) {
      left = 0
    } else if (left + cropDivWidth >= width) {
      left = width - cropDivWidth
    }
    if (top <= 0) {
      top = 0
    } else if (top + cropDivHeight >= height) {
      top = height - cropDivHeight
    }

    this.props.setCropDivLeftAndTopPlain({ top, left })
  }

  handleScale(diffHeight: number, diffWidth: number) {
    const { handleScaleChange } = this.props;
    if (diffHeight > 3500 || diffWidth > 3500) {
      handleScaleChange(15)
    } else if (diffHeight > 3000 || diffWidth > 3000) {
      handleScaleChange(20)
    } else if (diffHeight > 2500 || diffWidth > 2500) {
      handleScaleChange(25)
    } else if (diffHeight > 2000 || diffWidth > 2000) {
      handleScaleChange(30)
    } else if (diffHeight > 1000 || diffWidth > 1000) {
      handleScaleChange(40)
    } else if (diffHeight > 800 || diffWidth > 800) {
      handleScaleChange(50)
    } else if (diffHeight > 600 || diffWidth > 600) {
      handleScaleChange(60)
    } else if (diffHeight > 400 || diffWidth > 400) {
      handleScaleChange(70)
    } else if (diffHeight > 200 || diffWidth > 200) {
      handleScaleChange(80)
    } else if (diffHeight <= 200) {
      handleScaleChange(95)
    }
  }

  drawCanvas(img: HTMLImageElement) {
    const { width, height, canvasDivHeight, canvasDivWidth, horizontalFlip, verticalFlip, showRotateSection, rotateCanvas, fineTuneRotate, brightnessValue, contrastValue, blurValue, saturateValue, cropDivWidth, cropDivHeight } = this.props;
    if (!width) {
      if (
        img.height + 100 > canvasDivHeight ||
        img.width + 250 > canvasDivWidth
      ) {
        // AUTO SCALE
        const diffHeight = img.height + 145 - canvasDivHeight
        const diffWidth = img.width + 250 - canvasDivWidth
        this.handleScale(diffHeight, diffWidth)
      }
      this.props.setWidthAndHeight({ width: img.width, height: img.height })
    }

    const node = this.canvasRef.current
    const context = node!.getContext('2d')!

    // HORIZONTAL FLIP
    if (horizontalFlip) {
      context.translate(width, 0)
      context.scale(-1, 1)
      this.props.toggleHorizontalFlip(horizontalFlip)
    }

    // VERTICAL FLIP
    if (verticalFlip) {
      context.translate(0, height)
      context.scale(1, -1)
      this.props.toggleVerticalFlip(verticalFlip)
    }

    // ROTATE IMAGE
    if (showRotateSection) {
      context.fillRect(0, 0, width, height)
      context.fillStyle = '#000000'

      // Move registration point to the center of the canvas
      context.translate(width / 2, height / 2)

      context.rotate((rotateCanvas * Math.PI) / 180)

      // // Rotate 1 degree
      context.rotate((fineTuneRotate * Math.PI) / 180)

      // Move registration point back to the top left corner of canvas
      context.translate(-width / 2, -height / 2)
      this.props.resetRotate()
    }

    // BRIGHTNESS
    let brightness = 'brightness(' + (50 + brightnessValue).toString() + '%) '

    // CONTRAST
    let contrast = 'contrast(' + (50 + contrastValue).toString() + '%) '

    // BLUR
    let blur = 'blur(' + (blurValue / 18).toString() + 'px) '

    //SATURATE
    let saturate = 'saturate(' + (50 + saturateValue).toString() + '%) '

    context.filter = brightness + contrast + blur + saturate

    if (this.props.cropImage) {
      this.props.setWidthAndHeight({ width: cropDivWidth, height: cropDivHeight })
      context.drawImage(
        img,
        this.props.cropDivLeft,
        this.props.cropDivTop,
        cropDivWidth,
        cropDivHeight,
        0,
        0,
        cropDivWidth,
        cropDivHeight
      )
      let imgURL = node!.toDataURL('image/png')
      this.props.handleUploadedFile({
        result: imgURL,
        fileName: this.props.imageName,
        width: cropDivWidth,
        height: cropDivHeight
      })
    }

    context.drawImage(img, 0, 0, width, height)

    // TEXT
    context.font = 'bold ' + this.props.textSize + 'px Arial'
    context.fillStyle = this.props.inputColor
    context.textAlign = 'center'
    context.fillText(this.props.textInput, width / 2, height / 2)

    if (this.props.downloadImageFlag) {
      let imgURL = node!.toDataURL('image/png')
      this.props.setImgURL(imgURL)
      this.props.downloadImage(imgURL)
    }
  }

  handleMouseUp = (e: any) => {
    let mouseXInCropElement = e.nativeEvent.offsetX
    let mouseYInCropElement = e.nativeEvent.offsetY

    let diffX = mouseXInCropElement - (this.props.cropDivClickInitialX + this.props.cropDivLeft)

    let diffY = mouseYInCropElement - (this.props.cropDivClickInitialY + this.props.cropDivTop)

    if (this.props.cropDivClickedResizeRegion === Region.RB) {
      this.props.setCropDivSize({ region: Region.RB, width: diffX, height: diffY })
    } else if (this.props.cropDivClickedResizeRegion === Region.RT) {
      this.props.setCropDivLeftAndTop({ top: diffY, left: 0 })
      this.props.setCropDivSize({ region: Region.RT, width: diffX, height: -diffY })
    } else if (this.props.cropDivClickedResizeRegion === Region.LT) {
      this.props.setCropDivLeftAndTop({ top: diffY, left: diffX })
      this.props.setCropDivSize({ region: Region.LT, width: -diffX, height: -diffY })
    } else if (this.props.cropDivClickedResizeRegion === Region.LB) {
      this.props.setCropDivLeftAndTop({ top: 0, left: diffX })
      this.props.setCropDivSize({ region: Region.LT, width: -diffX, height: diffY })
    }
  }

  render() {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div
        id="canvas-wrap"
        style={{
          maxHeight: this.props.canvasDivHeight - 50,
          maxWidth: this.props.canvasDivWidth
        }}
      >
        <canvas
          ref={this.canvasRef}
          width={this.props.width || 500}
          height={this.props.height || 500}
          onMouseUp={this.handleMouseUp}
          // onMouseMove={this.handleOnMouseMove}
          style={{
            transform: 'scale(' + this.props.scaleValue / 100 + ')'
          }}
        />
        {this.props.showCropCanvas ? (
          <CropElement
            key={1}
            id={1}
            flag={this.props.cropDivClickedResizeRegion}
            left={this.props.cropDivLeft}
            top={this.props.cropDivTop}
            canvasRef={this.canvasRef}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  image: state.image,
  height: state.height,
  width: state.width,
  imageName: state.imageName,
  brightnessValue: state.brightnessSliderValue,
  contrastValue: state.contrastSliderValue,
  blurValue: state.blurSliderValue,
  saturateValue: state.saturateSliderValue,
  showCropCanvas: state.showCropCanvas,
  textInput: state.textInput,
  showTextField: state.showTextField,
  inputColor: state.inputColor,
  textSize: state.textSize,
  downloadImageFlag: state.downloadImageFlag,
  scaleValue: state.scaleValue,
  horizontalFlip: state.horizontalFlip,
  verticalFlip: state.verticalFlip,
  rotateCanvas: state.rotateCanvas,
  fineTuneRotate: state.fineTuneRotate,
  showRotateSection: state.showRotateSection,
  canvasDivHeight: state.canvasDivHeight,
  canvasDivWidth: state.canvasDivWidth,
  cropDivClickedResizeRegion: state.cropDivClickedResizeRegion,
  cropDivClickInitialX: state.cropDivClickInitialX,
  cropDivClickInitialY: state.cropDivClickInitialY,
  cropDivWidth: state.cropDivWidth,
  cropDivHeight: state.cropDivHeight,
  cropDivTop: state.cropDivTop,
  cropDivLeft: state.cropDivLeft,
  cropImage: state.cropImage,
  showSlider: state.showSlider
})

const createActions = {
  setWidthAndHeight,
  downloadImage,
  toggleHorizontalFlip,
  toggleVerticalFlip,
  resetRotate,
  setImgURL,
  handleScaleChange,
  setCropDivSize,
  setCropDivLeftAndTop,
  setCropDivLeftAndTopPlain,
  handleUploadedFile: handleFileChange
};

const canvasTarget = {
  drop(props: any, monitor: any, component: any) {
    component.updateStateOnDrop(monitor)
  }
}

function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    monitor: monitor
  }
}

export default connect(
  mapStateToProps,
  createActions
  // @ts-ignore
)(DropTarget('crop-div', canvasTarget, collect)(Canvas))
