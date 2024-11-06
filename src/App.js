import {useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Draggable from "react-draggable";


class State {
  constructor(action, result, position=[0, 0]) {
      this.action = action;
      this.result = result;
      this.children = [];
      this.position = [0, 0]

      const updatePos = (data) => {
        this.position = data;
      }


      this.jsx = <Node
        action = {this.action}
        result = {this.result}
        updatePosition = {updatePos}
        position={this.position}
        key={this.action}
      />
  }

  addChild(action, result) {
      const child = new State(action, result)
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





function Node({action, result, updatePosition, position = [0, 0]}) {

  const pos = useRef(position);

  const trackDrag = (e, ui) => {
    const [x, y] = pos.current;
    pos.current = (
      [x + ui.deltaX,
        y + ui.deltaY,]
    );
    updatePosition(pos.current)
  }

  return (
    <div>
      <Draggable
        defaultPosition={{x:position[0], y:position[1]}}
        onDrag={trackDrag}
      >
        <div className='Node'>
          <h1>{action}</h1>
          <p>{result}</p>
        </div>
      </Draggable>
    </div>
  );
}


function Line ({startPos, endPos}) {
  return (
    <div className="Line">

    </div>
  );
}






function parseStory(story) {
  return [story.jsx].concat(...story.children.map(parseStory))

}




const story = new State("Start", "You are here")
story.addChild("Left", "You are left")
story.addChild("Right", "You are Right")

story.getChild("Right").addChild("Forward", "You are Right and forward")

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
        <div className='Sidebar'>
          <h1>Settings</h1>
        </div>
        {data}
      </header>
    </div>
  );
}

export default App;
