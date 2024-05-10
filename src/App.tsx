/* eslint-disable @typescript-eslint/no-unused-vars */

import styles from './app.module.scss';
import CanvasTemplate from "./components/CanvasTemplate";

const App = () => {

  return (
    <div className={styles.main__container}>
      <CanvasTemplate />
    </div>
  )
}

export default App