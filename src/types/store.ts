export interface AppState {
  image?: any;
  imageName?: string | null;
  height?: number | null;
  width?: number | null;
  showResizeSection: boolean;
  brightnessSliderValue: number;
  showSlider: boolean;
  contrastSliderValue: number;
  blurSliderValue: number;
  saturateSliderValue: number;
  showCropCanvas: boolean;
  showTextField: boolean;
  textInput: string;
  inputColor?: string | null;
  textSize: number;
  downloadImageFlag: boolean;
  scaleValue: number;
  showRotateSection: boolean;
  horizontalFlip: boolean;
  verticalFlip: boolean;
  rotateCanvas: number;
  fineTuneRotate: number;
  inactValue: number;
  imgURL?: any;
  canvasDivHeight?: number | null;
  canvasDivWidth?: number | null;
  cropDivClickedResizeRegion: Region | boolean;
  cropDivClickInitialX?: number | null;
  cropDivClickInitialY?: number | null;
  cropDivWidth: number;
  cropDivHeight: number;
  cropDivTop: number;
  cropDivLeft: number;
  cropImage: boolean;
  saveTextFlag: boolean;
}

export interface ReduxAction {
  type: string
  payload: any
}

export enum Region {
  RB ="RB",
  RT = "RT",
  LT = "LT",
  LB = "LB",
}
