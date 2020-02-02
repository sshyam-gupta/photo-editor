import { ActionType } from './../../constants/actionType';

export function handleUploadedFile(e: any) {
  return {
      type: ActionType.HANDLE_FILE_UPLOAD,
      payload: e
  };
}

export function handleShowResizeModal(e: any) {
  return {
      type: ActionType.SHOW_RESIZE_MODAL
  };
}

export function handleCloseResizeModal(e: any) {
  return {
      type: ActionType.CLOSE_MODAL
  };
}

export function handleShowSlider(showSlider: boolean) {
  return {
      type: ActionType.SHOW_SLIDER,
      payload: showSlider
  };
}

export function handleShowCropCanvas(showCropCanvas: boolean) {
  return {
      type: ActionType.SHOW_CROP_CANVAS,
      payload: showCropCanvas
  };
}

export function handleShowTextField(showTextField: boolean) {
  return {
      type: ActionType.SHOW_TEXT_FIELD,
      payload: showTextField
  };
}

// TEXT INPUT ACTIONS
export function handleTextChange(e: any) {
  return {
      type: ActionType.HANDLE_TEXT_CHANGE,
      payload: e.target.value
  };
}
export function handleChangeComplete(e: any) {
  return {
      type: ActionType.HANDLE_COLOR_CHANGE,
      payload: e.hex
  };
}
export function handleTextSizeChange(event: any, value: any) {
  return {
      type: ActionType.HANDLE_TEXT_SIZE_CHANGE,
      payload: value
  };
}