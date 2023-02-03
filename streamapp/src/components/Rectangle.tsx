import { DrawableObject, feedHeight, feedWidth } from "./types";

const Rectangle = (props: DrawableObject) => {

    const width = (props.width * feedWidth).toFixed(0);
    const height = (props.width * feedHeight).toFixed(0);
    const x = (props.x * feedWidth).toFixed(0);
    const y = (props.y * feedHeight).toFixed(0);

    return (
        <>
            <div
            style={{"position": 'absolute', "left":`${x}px`, "top":`${y}px`, "width": `${width}px`, "height": `${height}px`, 
            "borderStyle": "solid", "zIndex": "10"}}
            >
                <div style={{"position": "relative"}}>
                    <p style={{"position": "absolute", "top": "-40px"}}>{props.name} {props.confidence}</p>
                </div>
            </div>
        </>
    );
}
export default Rectangle