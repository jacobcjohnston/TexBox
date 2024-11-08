import './App.css';
import Root from './Root';
import Node from './NodeComp';
import {MapProvider } from './MapContext';




function Line ({startPos, endPos}) {
  const width = Math.abs(startPos[0] - endPos[0]);
  const height = Math.abs(startPos[1] - endPos[1]);



  return (
    <div>
      <div className="Line Horizontal" style = {
        {
          width:width+6,
          left:Math.min(startPos[0], endPos[0]),
          top:height/2 + startPos[1],
        }
      }></div>
      <div className="Line Vertical" style = {
        {
          height:height/2+6,
          left:startPos[0],
          top:startPos[1],
        }
      }></div>
      <div className="Line Vertical" style = {
        {
          height:height/2,
          left:endPos[0],
          top:height/2 + startPos[1],
        }
      }></div>
    </div>
  );
}


function App() {

  /*const keyPress = useCallback(
    () => {
      setData(data.concat(["Hello?"]))
    },
    [setData, data]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyPress);
    return () => document.removeEventListener("keyup", keyPress);
  }, [keyPress])*/


  return (
    <div className="App">
      <header className="App-header">
        <MapProvider>
          <Root/>
          <Node action={"Jump"}/>
        </MapProvider>
      </header>
    </div>
  );
}

export default App;
