import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import axios from 'axios';


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

type CanvasState = {
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
  };
  objects: CanvasObject[];
};

const CanvasTemplate = () => {
  const canvasRef = useRef(null);

    const [template, setTemplate] = useState<CanvasState | null>(null);

  useEffect(()=> {
    const fetchData = async() => {
      const response = await axios.get("http://localhost:7683/api/v1/main/getTemplate")
      console.log(response.data)
      setTemplate(response.data);
    }

    fetchData();
  }, [])


  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    // Set canvas dimensions and background color
    canvas.setDimensions({
      width: template?.canvas.width,
      height: template?.canvas.height,
    });
    canvas.backgroundColor = template?.canvas.backgroundColor;


    // Add objects to canvas based on template data
    template?.objects.forEach(objData => {
      let fabricObject = null;

      if (objData.type === 'image') {
        fabric.Image.fromURL("https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww", img => {
          fabricObject = img.set({
            scaleX: objData.scaleX || 1,
            scaleY: objData.scaleY || 1,
            top: objData.top || 0,
            left: objData.left || 0,
            opacity: objData.opacity || 1
          });
          canvas.add(fabricObject);
        });
      } else if (objData.type === 'text') {
        fabricObject = new fabric.Text(objData.text as string, {
          fontSize: objData.fontSize || 20,
          fontFamily: objData.fontFamily || 'Arial',
          fontWeight: objData.fontWeight || 'normal',
          fill: objData.fill || '#000',
          top: objData.top || 0,
          left: objData.left || 0
        });
        canvas.add(fabricObject);
      }
    });

    return () => {
      canvas.dispose(); // Clean up Fabric.js canvas on unmount
    };
  }, []); // Empty dependency array to run effect only once on mount

  return <canvas ref={canvasRef} />;
};

export default CanvasTemplate;
