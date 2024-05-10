import { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import axios from 'axios';
import { CanvasState } from './types';
import useSmallScreen from '../hooks/useSmallScreen';
import { apiUrl, imageUrl } from '../constants/constant';

const CanvasTemplate = () => {
  const canvasRef = useRef(null);

    const [template, setTemplate] = useState<CanvasState | null>(null);
    const isSmallScreen : boolean = useSmallScreen();


  useEffect(()=> {
    const fetchData = async() => {
      const response = await axios.get(apiUrl);
      setTemplate(response.data);
    }

    fetchData();
  }, [])


  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    canvas.setDimensions({
      width: isSmallScreen? template?.canvas.height as number : template?.canvas.width as number,
      height: isSmallScreen? template?.canvas.width as number : template?.canvas.height as number,
    });

    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: "pixels",
      coords: { x1: 0, y1: 0, x2: 0, y2: template?.canvas.height },
      colorStops: [
        { offset: 0, color: template?.canvas.backgroundColor.split(',')[0].slice(16) as string},
        { offset: 1, color: template?.canvas.backgroundColor.split(',')[1].slice(0, -1) as string}
      ]
    });

    canvas.backgroundColor = gradient as unknown as string ;


    template?.objects.forEach((objData,ind : number) => {
      let fabricObject;

      if (objData.type === 'image') {
        fabric.Image.fromURL(imageUrl, img => {
          fabricObject = img.set({
            scaleX: objData.scaleX || 1,
            scaleY: objData.scaleY || 1,
            top: isSmallScreen? ind === 0 ? 50 : 100 : objData.top || 0,
            left: objData.left || 0,
            opacity: objData.opacity || 1
          });
          canvas.add(fabricObject);
        });
      } 
      else if (objData.type === 'text') {
        fabricObject = new fabric.Text(objData.text as string, {
          fontSize: objData.fontSize || 20,
          fontFamily: objData.fontFamily || 'Arial',
          fontWeight: objData.fontWeight || 'normal',
          fill: objData.fill || '#000',
          top: isSmallScreen? ind === 2 ? 450 : ind === 3 ? 500 : 500*(ind/3.5) : objData.top || 0,
          left: isSmallScreen ? 0 : objData.left || 10
        });
        canvas.add(fabricObject);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, [template, isSmallScreen]);

  return <canvas ref={canvasRef} />;
};

export default CanvasTemplate;
