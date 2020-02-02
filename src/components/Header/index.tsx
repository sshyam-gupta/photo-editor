import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import './styles.css'
import { AppState } from '../../types/store'
import { ActionType } from '../../constants/actionType'
import { FaFileUpload, FaEnvelopeOpenText, FaFileDownload, FaPaperPlane } from 'react-icons/fa'

class Header extends Component<any> {
  fileInput: any
  buttonElement: any

  state = {
    sentEmailFlag: false,
    emailIndicator: '',
    emailSuccess: false,
    emailFailer: false,
    email: ''
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

  handleSendEmail = () => {
    this.setState({
      sentEmailFlag: true,
      emailIndicator: 'Your request is being processed...'
    })
    // let imageForEmail = this.props.imgURL.split(",")[1];

    // Success
    // this.setState(
    //  {
    //    emailSuccess: true,
    //    sentEmailFlag: false,
    //    emailIndicator: "Email has been sent successfully!"
    //  },

    // Error
    //  this.setState({
    //    emailSuccess: false,
    //    emailIndicator: ""
    //  });
  }

  handleChange = (e: any) => {
    this.setState({ email: e.target.value })
  }

  render() {
    return (
      <div className="header-container">
        <div className="left-side">
          <div
            className="header-icons"
            onClick={() => this.fileInput.click()}
            data-tip="Upload Image"
          >
            <FaFileUpload />
          </div>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={e => this.onImageChange(e)}
            ref={fileInput => (this.fileInput = fileInput)}
          />
        </div>
        <div className="center-part">
          {this.state.sentEmailFlag ? (
            <div className="alert alert-info p-2 m-0" role="alert">
              {this.state.emailIndicator}
            </div>
          ) : null}

          {this.state.emailSuccess ? (
            <div className="alert alert-success p-2 m-0" role="alert">
              {this.state.emailIndicator}
            </div>
          ) : null}
          {this.state.emailFailer ? (
            <div className="alert alert-danger p-2 m-0" role="alert">
              {this.state.emailIndicator}
            </div>
          ) : null}
        </div>
        <div className="right-side">
          <div>
            {this.props.image ? (
              <>
                <button
                  className="btn btn-primary"
                  ref={button => (this.buttonElement = button)}
                  data-tip
                  data-for="clickme"
                  data-event="click"
                  // onClick={this.handleSendEmail}
                >
                  <span>Send Email</span>
                  <FaEnvelopeOpenText />
                </button>

                <button
                  className="btn btn-success"
                  onClick={this.props.setDownloadImageFlag}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Download image"
                >
                  <span>Download</span>
                  <FaFileDownload />
                </button>
              </>
            ) : null}
          </div>
        </div>
        <ReactTooltip place="right" type="info" />
        <ReactTooltip id="clickme" place="bottom" effect="solid" clickable={true}>
          <div className="inside-wrapper">
            <input
              value={this.state.email}
              type="email"
              placeholder="Your email"
              onChange={this.handleChange}
            />
            <button className="btn btn-primary btn-sm" onClick={this.handleSendEmail}>
              <FaPaperPlane />
            </button>
          </div>
          <small>We do not store your email address.</small>
        </ReactTooltip>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleUploadedFile: (e: any) => {
      dispatch({ type: ActionType.HANDLE_FILE_UPLOAD, payload: e })
    },
    setDownloadImageFlag: () => {
      dispatch({ type: ActionType.SET_DOWNLOAD_IMAGE_FLAG })
    }
  }
}

const mapPropsToState = (state: AppState) => {
  return {
    image: state.image,
    imageName: state.imageName,
    imgURL: state.imgURL
  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Header)
