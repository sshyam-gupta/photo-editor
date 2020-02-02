import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HuePicker } from 'react-color'

import { AppState } from '../../types/store'
import { ActionType } from '../../constants/actionType'
import Slider from 'rc-slider'

class TextInput extends Component<any> {
  render() {
    return (
      <div className="text-input-div" style={{}}>
        {this.props.showTextField ? (
          <div
            className="inside-text-input"
            style={{
              margin: '2px 5px',

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <label htmlFor="text-input" style={{ color: '#f1f1f1' }}>
              Your text
            </label>
            <input
              type="text"
              id="text-input"
              placeholder="Type something"
              style={{
                borderRadius: '7px',
                marginBottom: '7px'
              }}
              onChange={this.props.handleTextChange}
              value={this.props.textInput}
            />

            {/* TEXT SIZE */}
            <label htmlFor="" style={{ color: '#f1f1f1', marginTop: '10px' }}>
              Text Size: {Math.floor(this.props.textSize)}
            </label>
            <div style={{ width: '90%' }}>
              <Slider
                // classes={{ container: classes.slider }}
                value={this.props.textSize}
                aria-labelledby="label"
                onChange={this.props.handleTextSizeChange}
              />
            </div>

            <label htmlFor="" style={{ color: '#f1f1f1', marginTop: '10px' }}>
              Color
            </label>
            <div>
              <HuePicker width="200px" onChangeComplete={this.props.handleChangeComplete} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    showTextField: state.showTextField,
    textSize: state.textSize,
    textInput: state.textInput
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleTextChange: (e: any) => {
      dispatch({ type: ActionType.HANDLE_TEXT_CHANGE, payload: e.target.value })
    },
    handleChangeComplete: (e: any) => {
      dispatch({ type: ActionType.HANDLE_COLOR_CHANGE, payload: e.hex })
    },
    handleTextSizeChange: (value: number) => {
      dispatch({ type: ActionType.HANDLE_TEXT_SIZE_CHANGE, payload: value })
    },
    setSaveTextFlag: (flag: any) => {
      dispatch({ type: ActionType.SET_SAVE_TEXT_FLAG, payload: flag })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextInput)
