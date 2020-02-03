import { ActionType } from './../../constants/actionType';
import { createAction } from "redux-actions";

export const setWidthAndHeight = createAction(ActionType.SET_WIDTH_AND_HEIGHT)
export const downloadImage = createAction(ActionType.DOWNLOAD_IMAGE)
export const toggleHorizontalFlip = createAction(ActionType.TOGGLE_HORIZONTAL_FLIP)
export const toggleVerticalFlip = createAction(ActionType.TOGGLE_VERTICAL_FLIP)
export const resetRotate = createAction(ActionType.RESET_ROTATE)
export const setImgURL = createAction(ActionType.SET_IMG_URL)
export const handleScaleChange = createAction(ActionType.HANDLE_SCALE_CHANGE)
export const setResizeRegionClicked = createAction(ActionType.SET_RESIZE_REGION_CLICKED)
export const setCropDivSize = createAction(ActionType.SET_CROP_DIV_SIZE)
export const setCropDivLeftAndTop = createAction(ActionType.SET_CROP_DIV_LEFT_AND_TOP)
export const setCropDivLeftAndTopPlain = createAction(ActionType.SET_CROP_DIV_LEFT_AND_TOP_PLAIN)
export const cropImage = createAction(ActionType.CROP_IMAGE)
export const handleFileChange = createAction(ActionType.HANDLE_FILE_UPLOAD)

export default {}