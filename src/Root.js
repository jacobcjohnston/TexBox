import {useContext, useState } from 'react';
import Draggable from "react-draggable";

import {MapContext} from './MapContext';


export default function Root({action="Start", result="Off on an adventure...", position=[0, 0]}) {

    const {map, setMap} = useContext(MapContext);
    

    const [pos, setPos] = useState(position);
  
    const trackDrag = (e, ui) => {
      const [x, y] = pos;
      setPos(
        [x + ui.deltaX,
          y + ui.deltaY,]
      );
    }

    const [resultText, setResultText] = useState(action);
    const storeResult = (e) => {
        setResultText(e.target.value);
        setMap({
            ...map,
            "_START":resultText,
        });
        console.log(map);
    }
  

  
  
    return (
        <div>
            <Draggable
            defaultPosition={{x:position[0], y:position[1]}}
            onDrag={trackDrag}
            >
            <div>
                <div className='Node'>
                <div  className='Start' ><h4>Start</h4></div>
                <textarea placeholder={result} onChange={storeResult}></textarea>
                </div>
            </div>
            </Draggable>
        </div>
    );
  }