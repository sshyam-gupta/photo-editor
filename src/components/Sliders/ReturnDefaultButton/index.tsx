import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../types/store'
import { ActionType } from '../../../constants/actionType'

class ReturnDefaultButton extends React.Component<any> {
  render() {
    return (
      <div>
        {this.props.showSlider ? (
          <div>
            <button
              className="btn btn-primary btn-block"
              style={{ borderRadius: '7px' }}
              onClick={this.props.handleReturnDefaultButton}
            >
              Default{' '}
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return { showSlider: state.showSlider }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleReturnDefaultButton: () => {
      dispatch({
        type: ActionType.HANDLE_RETURN_DEFAULT_BUTTON
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnDefaultButton)
