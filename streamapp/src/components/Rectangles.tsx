import { useState } from "react";
import Rectangle from "./Rectangle";
import { DrawableObject } from "./types";


interface RectangleObjects {
    rectangles: Array<DrawableObject>;
}

const Rectangles = (props: RectangleObjects) => {
    
    const rectangles = props.rectangles;
    console.log(props.rectangles)

    const rectangleGroup = rectangles.length === 0 ? <></> : rectangles.map((r) =>
        <>
            <Rectangle key={r.name} name={r.name} confidence={r.confidence} x={r.x} y={r.y} width={r.width} height={r.height}></Rectangle>
        </>
        );
      

    return (
        <>
            {rectangleGroup}
        </>
    )
}
export default Rectangles