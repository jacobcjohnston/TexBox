import React, { useContext, useRef, useEffect} from "react";
import { MapContext } from "./MapContext";

export default function Sidebar() {
    const {map, _} = useContext(MapContext);
    const projectName = useRef("A TexBox Adventure");
    let html;

    const handleNameChange = (e) => {
        projectName.current = e.target.value; 
        html = `
    <!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<head>
    <title>${projectName.current}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="icon" type="image/x-ixon" href="https://uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/crossed-swords-icon.png">
        <link rel="stylesheet" type="text/css" href="">
    <style>

        :root {
        --metal:#282C33;
        --navy:#1B263B;
        --dark:#0d1b2a;
        --cream:#E0E1DD;
        --paleBlue:#415A77;
        --blue:#415a77;
        --superDark:#0D131A;
        background-color: var(--metal);
        }


        body {
            margin: 0px;
            padding:3vmin 5vmin;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color:var(--cream);

        }

        code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
                monospace;
        }

        h1 {
            font-size: 10vmin;
            text-align: center;

        }

        h2 {
            font-size: 3.5vmin;
            letter-spacing: 1.3px;
            font-variant: small-caps;
            text-align: justify;
        }

        #end {
            text-align: center;
            font-weight: 400;
        }

        #end h2 {
            font-size: 3.5vmin;
            text-align: center;
            letter-spacing:4px;

        }
        #end h3 {
            font-size: 2.3vmin;
            text-align: center;

        }

        
        li {
            font-size: 3.2vmin;
            line-height: 6vmin;
            list-style-type: none;
        }

        li.selected {
            list-style-type: ">>  ";
        }

        footer {
            font-size:2vmin;
            font-variant: small-caps;
            line-height: 0;
            text-align: right;
            font-weight: 200;
            width:100vw;
            height:6vmin;
            position: fixed;
            bottom:0px;
            right:0px;
            padding-right:2vmin;
            opacity:25%
        }
        #TexBox {
            font-size: 2.5vmin;
            padding-left: 1.5vmin;
        }


    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>

<body>
    <div id="root">
        <h1>${projectName.current}</h1>
        <div id="story">
        </div>
        <ol id="options"></ol>
        <div id="end" className="End">
            <h2>THE END</h2>
            <h3>PRESS R TO RESTART</h3>
        </div>
        
    </div>

    <script>
        const map = JSON.parse(${JSON.stringify(map)})


        let pos = "";
        let selection = 0;

        function findOptions(pos, map) {
            const optionKeys = Object.keys(map).filter((x) => {
                return x.slice(0, pos.length) == pos && x.split("_").length== pos.split("_").length + 1
            });

            return optionKeys.toSorted().map((x, i) => \`<li id="option\${i}">\${map[x].action}</li>\`)
        }

        function setSelected(selection) {
            $("li").removeClass("selected");
            $(\`#option\${selection}\`).addClass("selected");
            console.log(selection);

        }


        function choose(choice) {
            pos += \`_\${choice}\`;

            $("#story").append(\`<h2>\${map[pos].result}</h2>\`)


            $("ol").empty();
            const options = findOptions(pos, map);
            if (options.length > 0) {
                $("#options").append(...findOptions(pos, map));
                selection = 0;
                setSelected(selection)
            } else {
                $("#end").show()
            };

            $("li").click(function () {
                choose($(this).index());
            })

        }


        function handleSelection(e) {
            const numOptions = $("li").length;

            if (e.key === "ArrowUp") {
                selection = (((selection - 1) % numOptions) + numOptions) % numOptions;
                setSelected(selection);

            } else if (e.key === "ArrowDown") {
                selection = (selection + 1) % numOptions;
                setSelected(selection);
            } else if (e.key === "Enter") {
                choose(selection)
            } else if (e.key === "r") {
                restart();
            }
        }


        function restart() {
            $("#story").empty();
            $("#end").hide();

            pos = "";
            selected = 0;


            choose(0);
            setSelected(selection);
        }

        $(document).ready(() => {
            $("body").on({
                keyup: handleSelection
            })
            restart();
        });

    </script>
<footer>
    <h4>Made by: <span id="TexBox">TEXBOX: a simple text-based game engine </span></h4>
</footer>

</body>
<html>
    `
    };


    useEffect(() => {handleNameChange({target:{value:"A TexBoxAdventure"}})}, [])


    return (
        <div>
            <div className="Sidebar">
                <div className="SidebarBackdrop">
                    <h1 className="Title">TexBox</h1>
                    <h2 className="Title">A simple text-based game engine</h2>

                    <div className="projectName">
                        <h3 className="projectName">PROJECT NAME</h3>
                        <input className="projectName" placeholder="New Texbox" onChange={handleNameChange}></input>
                    </div>

                    <a
                        href = {
                            `data:text/plain,${html}`
                        }
                        download = {`${projectName.current}.html`}
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        <button id="Export">Export Story</button>
                    </a>
                </div>
            </div>
        </div>
    );
}