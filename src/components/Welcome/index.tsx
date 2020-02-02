import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

import './styles.css'
import { AppState } from '../../types/store'

interface WelcomeState {
  showSpinner: boolean
}

class Welcome extends Component<any, WelcomeState> {
  fileInput: any
  state = {
    showSpinner: false
  }

  handleDroppedFiles(monitor: any) {
    console.log('monitor.getItem().files: ' + monitor.getItem().files)
    this.setState({ showSpinner: true }, () => {
      this.onImageChange({ target: { files: monitor.getItem().files } })
    })
  }

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

  handleCrossClick = (e: any) => {
    e.stopPropagation()
    localStorage.clear()
    this.forceUpdate()
  }

  render() {
    const { connectDropTarget, isOver } = this.props

    // @ts-ignore
    let localStorageImage = JSON.parse(localStorage.getItem('image'))
    return (
      <div style={{ height: '100%' }}>
        <div className="wrapper">
          <div className="upper-wrapper">
            {localStorageImage ? (
              <div className="panel-right">
                <div className="header-for-right-panel">Previously Edited Images</div>
                <div className="row-flex-wrapper">
                  <div className="image-wrapper">
                    <div
                      className="image-box"
                      onClick={() =>
                        this.props.setImage(localStorageImage.url, localStorageImage.name)
                      }
                      style={{
                        backgroundImage: `url(${localStorageImage.url}`
                      }}
                    >
                      <i className="fas fa-times" onClick={this.handleCrossClick} />
                    </div>
                    <div className="image-desc">{localStorageImage.name}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="panel-right">
                <div className="header-for-right-panel">Previously Edited Images</div>
                <div className="row-flex-wrapper">
                  <div className="image-wrapper">
                    <div className="image-box" style={{ cursor: 'auto' }} />
                    <div className="image-desc">Such an empty list!</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lower-wrapper">
            <div className="lower-left-panel">{/* HELlo */}</div>

            {connectDropTarget(
              <div className="drag-drop-panel" onClick={e => this.fileInput.click()}>
                {this.state.showSpinner ? (
                  <div>Spinner</div>
                ) : isOver ? (
                  <h2>Release to Upload!</h2>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <h3>Drag and Drop to Upload</h3>
                    <span style={{ fontSize: 17 }}>Or Click Here</span>
                  </div>
                )}
              </div>
            )}
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={e => this.onImageChange(e)}
              ref={fileInput => (this.fileInput = fileInput)}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispachToProps = (dispatch: any) => {
  return {
    handleUploadedFile: (file: any) => {
      dispatch({ type: 'HANDLE_FILE_UPLOAD', payload: file })
    },
    setImage: (image: any, name: any) => {
      dispatch({
        type: 'SET_IMAGE_FROM_WELCOME_SCREEN',
        payload: { result: image, fileName: name }
      })
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return { image: state.image }
}

const nativeFileTarget = {
  hover(props: any, monitor: any) {
    monitor.isOver({ shallow: true })
  },
  drop(props: any, monitor: any, component: any) {
    component.handleDroppedFiles(monitor)
  }
}

function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOverCurrent: monitor.isOver({ shallow: false }),
    itemType: monitor.getItemType(),
    didDrop: monitor.didDrop(),

    isOver: monitor.isOver()
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DropTarget(NativeTypes.FILE, nativeFileTarget, collect)(Welcome))
