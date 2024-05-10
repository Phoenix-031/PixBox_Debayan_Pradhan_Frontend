type CanvasObject = {
  type: 'image' | 'text';
  source?: string;
  scaleX?: number;
  scaleY?: number;
  top: number;
  left: number;
  opacity?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fill?: string;
};

export type CanvasState = {
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
  };
  objects: CanvasObject[];
};