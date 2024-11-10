import logo from "./logo.svg";
import {Line} from "./NodeComp.js";
import getVMin, {useAbsoluteDimensions} from './window';


export default function Instructions() {
    return (
        <div id="Instruction-Container">
            <h1 className="Instructions">Instructions</h1>
            <ol className="Instructions">
                <li className="Instructions">TexBox works by chaining together ACTION nodes. Each node describes a choice the player can make and the result.</li>
                <li className="Instructions">Beggining with the START node, write a description of where the player is, then click on the plus icon to create new ACTION nodes.</li>
                <li className="Instructions">After creating a new node, click on the title at the top and change the text to be a description of the choice. Then, in the big text box below, write about what happens next! </li>
                <li className="Instructions">But the best part is, ACTION nodes themselves can have more choices and more ACTION nodes. Just keep clicking plus icons to make more options and more storylines!</li>
                
            </ol>





            <div className="Node Example" id="ExampleNode">
                <input className="Action" placeholder="Start" readOnly></input>
                <textarea placeholder={"You are in a forest"} readOnly></textarea>
                <img src={logo} className='Plus' alt="logo"/>
                <Line startPos={[useAbsoluteDimensions()[0]*0.82 - getVMin()*0.116-12, 100 + getVMin()*0.186]} endPos={[useAbsoluteDimensions()[0]*0.89 - getVMin()*0.116-12, 310]}/>
                <Line startPos={[useAbsoluteDimensions()[0]*0.82 - getVMin()*0.116-12, 100 + getVMin()*0.186]} endPos={[useAbsoluteDimensions()[0]*0.70 - getVMin()*0.116-12, 310]}/>
            
            </div>
            <div className="Node Example" id="ExampleNode2">
                <input className="Action" placeholder="Go Left" readOnly></input>
                <textarea placeholder={"You are in the left half of the forest."} readOnly></textarea>
                <img src={logo} className='Plus' alt="logo"/>

            </div>
            <div className="Node Example" id="ExampleNode3">
                <input className="Action" placeholder="Go Right" readOnly></input>
                <textarea placeholder={"You are in the right half of the forest."} readOnly></textarea>
                <img src={logo} className='Plus' alt="logo"/>

            </div>
        </div>
    )
}