import React from "react";
import { Image, Transformation } from 'cloudinary-react';

function Picture(props){

    return(<div>
        <Image publicId={props.publicId} version={props.version} cloud_name="charlotte-co">
            <Transformation width={props.width} crop="scale"/>
            <Transformation quality={props.quality}/>
        </Image><br/>
    </div>)
}
 
export default Picture;