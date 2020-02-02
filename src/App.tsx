import React, { Component } from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import './App.css'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Canvas from './components/Canvas'
import BrightnessSlider from './components/Sliders/BrightnessSlider'
import ContrastSlider from './components/Sliders/ContrastSlider'
import BlurSlider from './components/Sliders/BlurSlider'
import SaturateSlider from './components/Sliders/SaturateSlider'
import ReturnDefaultButton from './components/Sliders/ReturnDefaultButton'
import TextInput from './components/TextInput'
import ResizeSection from './components/ResizeSection'
import RotateSection from './components/RotateSection'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import CropSection from './components/CropSection'
import { AppState } from './types/store'

class App extends Component<any, any> {
  canvasDiv: any
  constructor(props: any) {
    super(props)
    this.canvasDiv = React.createRef()
  }

  componentDidUpdate() {
    this.props.setWidthAndHeightOfCanvasDiv(
      this.canvasDiv.current.clientWidth,
      this.canvasDiv.current.clientHeight
    )
  }

  render() {
    if (this.props.image) {
      return (
        <div className="App">
          <div className="wrapper">
            <div className=" header" style={{ flexDirection: 'row' }}>
              <Header />
            </div>

            <div className="middle-wrapper">
              <div className="side-menu">
                <div className="icons">
                  <Navbar />
                </div>
                <div className="options">
                  <BrightnessSlider />
                  <ContrastSlider />
                  <SaturateSlider />
                  <BlurSlider />
                  <ReturnDefaultButton />
                  <TextInput />
                  <ResizeSection />
                  <RotateSection />
                  <CropSection />
                </div>
              </div>

              <div className="content" ref={this.canvasDiv}>
                <Canvas />
              </div>
            </div>

            <div className="footer">
              <Footer showCropCanvas={this.props.showCropCanvas} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <Welcome />
        </div>
      )
    }
  }
}

const mapDispachToProps = (dispatch: any) => {
  return {
    setWidthAndHeightOfCanvasDiv: (width: number, height: number) => {
      dispatch({
        type: 'SET_WIDTH_AND_HEIGHT_OF_CANVAS_DIV',
        payload: { width, height }
      })
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    image: state.image,
    showCropCanvas: state.showCropCanvas
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
  // @ts-ignore
)(DragDropContext(HTML5Backend)(App))
