import { Reducer } from 'redux'

import { AppState, ReduxAction } from '../../types/store'
import { ActionType } from '../../constants/actionType';

const initialState = {
  image: null,
  imageName: null,
  height: null,
  width: null,
  showResizeSection: false,
  brightnessSliderValue: 50,
  showSlider: true,
  contrastSliderValue: 50,
  blurSliderValue: 0,
  saturateSliderValue: 50,
  showCropCanvas: false,
  showTextField: false,
  textInput: "",
  inputColor: null,
  textSize: 16,
  downloadImageFlag: false,
  scaleValue: 100,
  showRotateSection: false,
  horizontalFlip: false,
  verticalFlip: false,
  rotateCanvas: 0,
  fineTuneRotate: 0,
  inactValue: 0,
  imgURL: null,
  canvasDivHeight: null,
  canvasDivWidth: null,
  cropDivClickedResizeRegion: false,
  cropDivClickInitialX: null,
  cropDivClickInitialY: null,
  cropDivWidth: 150,
  cropDivHeight: 150,
  cropDivTop: 0,
  cropDivLeft: 0,
  cropImage: false,
  saveTextFlag: false
};

const rootReducer: Reducer<AppState, ReduxAction> = (state: AppState = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ActionType.HANDLE_FILE_UPLOAD:
      return {
        ...state,
        image: action.payload.result,
        imageName: action.payload.fileName,
        errorMessage: "",
        width: action.payload.width || null,
        height: action.payload.height || null,
        cropImage: false,
        cropDivLeft: 0,
        cropDivTop: 0,
        cropDivWidth: (state.width ?? 1) * 0.5,
        cropDivHeight: (state.height ?? 1) * 0.5
      }
    case ActionType.SET_IMAGE_FROM_WELCOME_SCREEN:
      return {
        ...state,
        image: action.payload.result,
        imageName: action.payload.fileName,
        errorMessage: "",
        width: null,
        height: null
      }
    case ActionType.SET_WIDTH_AND_HEIGHT:
      return {
        ...state,
        width: parseInt(action.payload.width),
        height: parseInt(action.payload.height)
      }
    case ActionType.SET_IMAGE_NAME:
      return {
        ...state,
        imageName: action.payload
      }
    case ActionType.SHOW_RESIZE_SECTION:
      if (!state.image) {
        return {
          ...state,
          showResizeSection: false,
          showSlider: false,
          showCropCanvas: false,
          showTextField: false,
          errorMessage: "Please upload an image first!"
        };
      }
      return {
        ...state,
        showResizeSection: !action.payload,
        showSlider: false,
        showCropCanvas: false,
        showTextField: false,
        showRotateSection: false,
        errorMessage: ""
      }

    case ActionType.SUBMIT_RESIZED_VALUES:
      if (action.payload.heigth >= window.outerHeight * 0.75) {
        return {
          ...state,
          width: action.payload.width,
          height: action.payload.heigth,
          showResizeSection: false,
          scaleCanvas: true
        };
      } else {
        return {
          ...state,
          width: action.payload.width,
          height: action.payload.heigth,
          showResizeSection: false,
          scaleCanvas: false
        };
      }

    case ActionType.SHOW_SLIDER:
      return {
        ...state,
        showSlider: !action.payload,
        showCropCanvas: false,
        showTextField: false,
        showResizeSection: false,
        showRotateSection: false,
        errorMessage: ""
      }
    case ActionType.HANDLE_BRIGHTNESS_CHANGE:
      return {
        ...state,
        brightnessSliderValue: action.payload
      }
    case ActionType.HANDLE_CONTRAST_CHANGE:
      return {
        ...state,
        contrastSliderValue: action.payload
      }
    case ActionType.HANDLE_BLUR_CHANGE:
      return {
        ...state,
        blurSliderValue: action.payload
      }
    case ActionType.HANDLE_SATURATE_CHANGE:
      return {
        ...state,
        saturateSliderValue: action.payload
      }
    case ActionType.HANDLE_RETURN_DEFAULT_BUTTON:
      return {
        ...state,
        brightnessSliderValue: 50,
        contrastSliderValue: 50,
        blurSliderValue: 0,
        saturateSliderValue: 50
      }

    case ActionType.SHOW_CROP_CANVAS:
      if (state.image) {
        return {
          ...state,
          showCropCanvas: !action.payload,
          showSlider: false,
          showTextField: false,
          showResizeSection: false,
          showRotateSection: false,
          scaleValue: 100,
          errorMessage: "",
          cropDivWidth: (state.width ?? 1) * 0.5,
          cropDivHeight: (state.height ?? 1) * 0.5,
          cropDivTop: 0,
          cropDivLeft: 0
        };
      } else {
        return {
          ...state,
          errorMessage: "Please upload an image!",
          showSlider: false,
          showRotateSection: false,
          showResizeSection: false,
          showTextField: false
        };
      }

    case ActionType.SHOW_TEXT_FIELD:
      return {
        ...state,
        showTextField: !action.payload,
        showSlider: false,
        showCropCanvas: false,
        showRotateSection: false,
        showResizeSection: false,
        errorMessage: ""
      };

    case ActionType.HANDLE_TEXT_CHANGE:
      return {
        ...state,
        textInput: action.payload
      }

    case ActionType.HANDLE_COLOR_CHANGE:
      return {
        ...state,
        inputColor: action.payload
      }
    case ActionType.HANDLE_TEXT_SIZE_CHANGE:
      return {
        ...state,
        textSize: action.payload
      }
    case ActionType.SET_DOWNLOAD_IMAGE_FLAG:
      return {
        ...state,
        downloadImageFlag: action.payload
      }
    case ActionType.SET_IMG_URL:
      return {
        ...state,
        imgURL: action.payload
      }

    case ActionType.DOWNLOAD_IMAGE:
      var link = document.createElement("a");
      let fileName = state.imageName?.split(".")[0];

      link.download = `${fileName}-Editted.jpg`;

      link.href = state.imgURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link.remove();

      return {
        ...state,
        downloadImageFlag: false
      };

    case ActionType.HANDLE_SCALE_CHANGE:
      return {
        ...state,
        scaleValue: Math.round(action.payload)
      };

    case ActionType.SHOW_ROTATE_SECTION:
      return {
        ...state,
        showRotateSection: !action.payload,
        showCropCanvas: false,
        showTextField: false,
        showResizeSection: false,
        showSlider: false,
        errorMessage: "",
        fineTuneRotate: 0
      }

    case ActionType.TOGGLE_HORIZONTAL_FLIP:
      return {
        ...state,
        horizontalFlip: !action.payload
      }

    case ActionType.TOGGLE_VERTICAL_FLIP:
      return {
        ...state,
        verticalFlip: !action.payload
      }

    case ActionType.ROTATE_90_DEGREE_LEFT:
      return {
        ...state,
        rotateCanvas: -90
      }

    case ActionType.ROTATE_90_DEGREE_RIGHT:
      return {
        ...state,
        rotateCanvas: 90
      }
    case ActionType.RESET_ROTATE:
      return {
        ...state,
        rotateCanvas: 0,
        fineTuneRotate: 0
      };
    case ActionType.HANDLE_FINE_TUNE_ROTATE:
      return {
        ...state,
        fineTuneRotate: state.inactValue - action.payload,
        inactValue: action.payload
      };
    case ActionType.SET_WIDTH_AND_HEIGHT_OF_CANVAS_DIV:
      return {
        ...state,
        canvasDivHeight: action.payload.height,
        canvasDivWidth: action.payload.width
      };
    case ActionType.SET_RESIZE_REGION_CLICKED:
      return {
        ...state,
        cropDivClickedResizeRegion: action.payload
      };
    case ActionType.SET_CROP_DIV_INITIAL_COOR:
      return {
        ...state,
        cropDivClickInitialX: action.payload.x,
        cropDivClickInitialY: action.payload.y
      };
    case ActionType.SET_CROP_DIV_SIZE:
      if (action.payload.region) {
        return {
          ...state,
          cropDivWidth: state.cropDivWidth + action.payload.width,
          cropDivHeight: state.cropDivHeight + action.payload.height,
          cropDivClickedResizeRegion: false
        };
      }
      return {
        ...state
      }
    case ActionType.SET_CROP_DIV_LEFT_AND_TOP:
      return {
        ...state,
        cropDivTop: state.cropDivTop + action.payload.top,
        cropDivLeft: state.cropDivLeft + action.payload.left
      };
    case ActionType.SET_CROP_DIV_LEFT_AND_TOP_PLAIN:
      return {
        ...state,
        cropDivTop: action.payload.top,
        cropDivLeft: action.payload.left
      };
    case ActionType.CROP_IMAGE:
      return {
        ...state,
        cropImage: !action.payload
      };
    case ActionType.SET_SAVE_TEXT_FLAG:
      return {
        ...state,
        saveTextFlag: action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;
