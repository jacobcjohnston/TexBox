import './App.css';
import Root from './Root';
import {MapProvider } from './MapContext';



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
        </MapProvider>
      </header>
    </div>
  );
}

export default App;
