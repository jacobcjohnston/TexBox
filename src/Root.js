import {useContext, useState } from 'react';
import Draggable from "react-draggable";
import {MapContext} from './MapContext';

import Node from './NodeComp';
import logo from "./logo.svg";

import Action from './Action';

export default function Root({action="Start", result="Off on an adventure...", position=[0, 0]}) {
    /*  --------------------- Hande Position -------------- */
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
    //const [resultText, setResultText] = useState("");
    const updateMap = (e) => {
        //setResultText(e.target.value);
        setMap({
            ...map,
            "_0":new Action("Start", e.target.value),
        });
        console.log(map);
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
                    <div  className='Start' ><h4>Start</h4></div>
                    <textarea placeholder={result} onChange={updateMap}></textarea>
                <img src={logo} className='Plus' alt="logo" onClick={addChild}/>
                </div>
            </div>
            </Draggable>
            {
                childList.map((x) => <Node
                    key={x}
                    id={`_0_${x}`}
                    action={`Action${x+1}`}
                    parentPos = {pos}
                    position={[pos[0] + x*250 - 300, pos[1] + 340]}
                />)
            }
        </div>
    );
  }