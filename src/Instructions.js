
export default function Instructions({visible, setVisible}) {


    return visible ? (
        <div id="Instruction-Container">
            <h1 className="Instructions">How to Use</h1>
            <img id="nodeGraph" src={require("./nodetree.png")} alt="Node tree"></img>
            <ol className="Instructions">
                <li className="Instructions">TexBox works by chaining together ACTION nodes. Each node describes a choice the player can make and the result.</li>
                <li className="Instructions">Beggining with the START node, write a description of where the player is, then click on the plus icon to create new ACTION nodes.</li>
                <li className="Instructions">After creating a new node, click on the title at the top and change the text to be a description of the choice. Then, in the big text box below, write about what happens next! </li>
                <li className="Instructions">But the best part is, ACTION nodes themselves can have more choices and more ACTION nodes. Just keep clicking plus icons to make more options and more storylines!</li>
                <li className="Instructions">When you're ready to play and share your game, just click "COMPILE STORY" and then "EXPORT STORY" to download a playable file of your game. (NOTE: You must press "COMPILE STORY" after making any changes, or the downloaded game will not show those changes)</li>
                <li className="Instructions">Happy Playing!</li>                
            </ol>
            <div>
                <h3 id="closeInstructions"
                    onClick={() => {
                        setVisible(false);
                    }}
                >X</h3>
            </div>
        </div>
    ) : (<></>)
}