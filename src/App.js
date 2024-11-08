import {useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Draggable from "react-draggable";





class State {
  constructor(action, result, parent=null, position=[0, 0]) {
      this.action = action;
      this.result = result;

      this.parent = parent;
      this.children = [];
      this.position = position;

      const updatePos = (data) => {
        this.position = data;
      }


      this.jsx = <Node
        action = {this.action}
        result = {this.result}
        updatePosition = {updatePos}
        position={this.position}
        parentPos={parent ? parent.position : parent}
        key={this.action}
      />
  }

  addChild(action, result) {
      const child = new State(action, result, this)
      this.children.push(child)
  }
  
  getChild(action) {
    for (const child of this.children) {
      if (child.action === action) {
        return child;
      }
    }
    return -1;
  }

}





function Node({action, result, updatePosition, parentPos, position = [0, 0]}) {

  const [pos, setPos] = useState(position);

  const trackDrag = (e, ui) => {
    const [x, y] = pos;
    setPos(
      [x + ui.deltaX,
        y + ui.deltaY,]
    );
    updatePosition(pos)
  }

  //const [parentPos, setParentPos] = useState(parent.position)



  return (
    <div>
      <Draggable
        defaultPosition={{x:position[0], y:position[1]}}
        onDrag={trackDrag}
      >
        <div>
          <div className='Node'>
            <h1 className="Action">{action}</h1>
            <textarea></textarea>
          </div>
          {
            (parentPos) ? (<Line startPos={[parentPos[0] - pos[0], parentPos[1] - pos[1]]} endPos = {[100, 5]}/>) : (<div></div>)
          }
        </div>
      </Draggable>
    </div>
  );
}


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






function parseStory(story) {
  return [story.jsx].concat(...story.children.map(parseStory))

}




const story = new State("Start", "You are here", null, [0, -300])
story.addChild("Left", "You are left")
story.addChild("Right", "You are Right")

console.log(story)
console.log(parseStory(story))


function App() {
  const [data, setData] = useState(parseStory(story));

  /*const keyPress = useCallback(
    () => {
      setData(data.concat(["Hello?"]))
    },
    [setData, data]
  );*/

  const keyPress = () => {
    console.log(story)
  }  

  useEffect(() => {
    document.addEventListener("keyup", keyPress);
    return () => document.removeEventListener("keyup", keyPress);
  }, [keyPress])


  return (
    <div className="App">
      <header className="App-header">

          {data}
      
      </header>
    </div>
  );
}

export default App;
