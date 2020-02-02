import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles.css'
import { AppState } from '../../types/store'
import { ActionType } from '../../constants/actionType'

class ResizeSection extends Component<any, any> {
  state = {
    width: 0,
    height: 0
  }

  onKeyPress = (e: any) => {
    if (e.which === 13) {
      this.props.handleEditExpense(this.props.currentInput, this.props.labelOfEditedExpense)
    }
  }

  handleWidthChange = (e: any) => {
    this.setState({ width: e.target.value })
  }
  handleHeighthChange = (e: any) => {
    this.setState({ height: e.target.value })
  }

  render() {
    if (this.props.showResizeSection) {
      return (
        <div className="resize-section-wrapper">
          <div className="resize-section">
            <div className="left-section">
              <label className="label label-resize" htmlFor="resize-width">
                Width:
              </label>
              <label className="label label-resize" htmlFor="resize-height">
                Heigth:
              </label>
            </div>

            <div className="right-section">
              <input
                type="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder={this.props.currentWidth}
                onChange={this.handleWidthChange}
              />
              <input
                type="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder={this.props.currentHeight}
                onChange={this.handleHeighthChange}
              />
            </div>
          </div>
          <button
            className="btn btn-primary btn-resize-section"
            onClick={() => this.props.submitResizeValues(this.state.width, this.state.height)}
          >
            Apply
          </button>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapDispachToProps = (dispatch: any) => {
  return {
    submitResizeValues: (width: number, height: number) => {
      dispatch({
        type: ActionType.SET_WIDTH_AND_HEIGHT,
        payload: { width, height }
      })
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    currentWidth: state.width,
    currentHeight: state.height,
    showResizeSection: state.showResizeSection
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ResizeSection)
