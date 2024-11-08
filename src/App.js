import './App.css';

import React, { useRef} from "react";

import Root from './Root';
import { MapProvider } from './MapContext';


function App() {


  //handle Panning
  const click = useRef(false);

  const detectClick = (e) => {
    click.current = true
  }

  return (
        <div className="App">
          <div 
            onClick = {() => click.current = true} 
            className="Pan"
          ></div>

          <header className="App-header">
            <MapProvider>
              <Root/>
            </MapProvider>
          </header>
        </div>
  );
}

export default App;
