/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";

import {fabric} from "fabric";

import { useEffect, useLayoutEffect, useState } from "react";

import styles from './app.module.scss';
import CanvasTemplate from "./components/CanvasTemplate";

// type CanvasObject = {
//   type: 'image' | 'text';
//   source?: string;
//   scaleX?: number;
//   scaleY?: number;
//   top: number;
//   left: number;
//   opacity?: number;
//   text?: string;
//   fontSize?: number;
//   fontFamily?: string;
//   fontWeight?: string;
//   fill?: string;
// };

// type CanvasState = {
//   canvas: {
//     width: number;
//     height: number;
//     backgroundColor: string;
//   };
//   objects: CanvasObject[];
// };

const App = () => {

  // const [template, setTemplate] = useState<CanvasState | null>(null);

  // useEffect(()=> {
  //   const fetchData = async() => {
  //     const response = await axios.get("http://localhost:7683/api/v1/main/getTemplate")
  //     console.log(response.data)
  //     setTemplate(response.data);
  //   }

  //   fetchData();
  // }, [])

    // useLayoutEffect(() => {

    //   console.log(template?.canvas,"vkjdnfjk")

		// const canvas = new fabric.Canvas('canvas', {
    //             height: template?.canvas.height,
    //             width: template?.canvas.width,
    //             fireRightClick: true,
    //             fireMiddleClick: true,
    //             backgroundColor: template?.canvas.backgroundColor
		// });
    //     canvas.requestRenderAll();
    // }, [template])
  return (
    <div className={styles.main__container}>
      <CanvasTemplate />
    </div>
  )
}

export default App