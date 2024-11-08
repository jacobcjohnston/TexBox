import {useState, useContext, useRef} from 'react';
import Draggable from "react-draggable";
import logo from "./logo.svg";

import { MapContext } from './MapContext';
import Action from './Action';

import getVMin from './window';




function Line ({startPos, endPos}) {
    const width = Math.abs(startPos[0] - endPos[0]);
    const height = Math.abs(startPos[1] - endPos[1]);
  
  
  
    return (
      <div>
        <div className="Line Horizontal" style = {
          {
            width:width+ getVMin()*0.0075,
            left:Math.min(startPos[0], endPos[0]),
            top:height/2 + startPos[1],
          }
        }></div>
        <div className="Line Vertical" style = {
          {
            height:height/2 + getVMin() * 0.0075,
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





export default function Node({id, action, result="...", parentPos, 
    position=[0, 0]}) {

    /* --------- Handle Position ---------*/
    const [pos, setPos] = useState(position);
  
    const trackDrag = (e, ui) => {
      const [x, y] = pos;
      setPos(
        [x + ui.deltaX,
          y + ui.deltaY,]
      );
    }



    /* ----------------- Handle Map Context ------------*/

    const {map, setMap} = useContext(MapContext);

    
    const updateMap = (actionAndResultText) => {
        setMap({
            ...map,
            [id]:actionAndResultText.current,
        });
        console.log(map);
    }



    /* Handle Text ---------------*/
  
    const actionAndResultText = useRef(new Action(action, result));
  
  
    const storeAction = (e) => {
        actionAndResultText.current.action = (e.target.value);
        updateMap(actionAndResultText);
    }

    const storeResult = (e) => {
        actionAndResultText.current.result = (e.target.value);
        updateMap(actionAndResultText);
    }
  

    /* Handle Children ------------------------ */
  
    const [childList, setChildList] = useState([]);


    const addChild = () => {
        setChildList(childList.concat([childList.length]))
    }

  
  
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
              <img src={logo} className='Plus' alt="logo" onClick = {addChild}/>
              <Line startPos={[parentPos[0] - pos[0] + (getVMin()*0.15), parentPos[1]-pos[1]+(getVMin()*0.28)]} endPos={[getVMin()*0.15, 10]}/>
            </div>
          </div>
        </Draggable>
        {
            childList.map((x) => <Node 
                key={x} 
                id={`${id}_${x}`}
                action={`Action${x+1}`}
                parentPos = {pos}
                position={[pos[0] + x*250 - 300, pos[1] + 340]}
            />)
        }
      </div>
    );
  }
  