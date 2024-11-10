import './App.css';
import React, { useEffect, useRef} from "react";
import Root from './Root';
import Sidebar from './Sidebar';

import { MapProvider } from './MapContext';


function App() {
  //Scroll to halfway in the middle at the start
  useEffect(() => {
    window.scrollBy(window.innerWidth/4 - 50, 0);
  }, []);



  //handle Panning
  const click = useRef(false);
  const speed = useRef([0, 0])

  const pan = (e) => {
    if(click.current) {
      speed.current[0] = (speed.current[0] - e.movementX)/2
      speed.current[1] = (speed.current[1] - e.movementY)/2

      window.scrollBy(speed.current[0], speed.current[1])
    } else{
      speed.current[0] /= 1.5
      speed.current[1] /= 1.5
    }
  }

  return (
        <div className="App">
          <div 
            onMouseDown = {() => click.current = true}
            onMouseUp = {() => click.current = false}
            onMouseMove = {pan}
            className="Pan"
          ></div>

          <header className="App-header">
            <MapProvider>
              <Root/>
              <Sidebar/>
            </MapProvider>
          </header>
        </div>
  );
}

export default App;
