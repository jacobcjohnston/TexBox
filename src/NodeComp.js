import {useState } from 'react';
import Draggable from "react-draggable";

export default function Node({action, result, position=[0, 0]}) {

    const [pos, setPos] = useState(position);
  
    const trackDrag = (e, ui) => {
      const [x, y] = pos;
      setPos(
        [x + ui.deltaX,
          y + ui.deltaY,]
      );
    }
  
    const [actionText, setActionText] = useState(action);
    const [resultText, setResultText] = useState(action);
  
  
    const storeAction = (e) => {setActionText(e.target.value); console.log(actionText)}
    const storeResult = (e) => {setResultText(e.target.value); console.log(resultText)}
  
  
  
    return (
      <div>
        <Draggable
          defaultPosition={{x:position[0], y:position[1]}}
          onDrag={trackDrag}
        >
          <div>
            <div className='Node'>
              <input className="Action" placeholder={action} onChange={storeAction}></input>
              <textarea placeholder={result} onChange={storeResult}></textarea>
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
  