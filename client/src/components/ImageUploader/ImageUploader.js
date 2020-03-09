import React, {useState, useEffect} from "react";
import cloudinary from "cloudinary-core";
import InputText from "../../components/Input/InputText";
import API from "../../utils/API";

function ImageUploader(props){
    const [  title, setTitle ] = useState("");
    const [  imageUrl, setImageUrl ] = useState("")

    function saveImage(e){
        e.preventDefault();
        const newImage ={
            title: title,
            url: imageUrl,
        }
        if(props === {}){
            API.postImage(newImage)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } else { 
            if (props.product._id){
                API.postImage({
                    ...newImage,
                    forProduct: props.product._id,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            } else if (props.transfer._id) {
                API.postImage({
                    ...newImage,
                    forTransfer: props.transfer._id,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            }
        }
    }

    function onChangeFile(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
    }

    return(<>
        <h1> show up please</h1>
        <form className="image-uploader">
            <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image Title"
            />
            <input id="myInput"
                type="file"
                style={{display: 'none'}}
                onChange={(e) => onChangeFile(e)}
            />
            <button
                label="Open File"
                primary={false}
                onClick={(e)=> saveImage(e)}
            />
        </form>
    </>)
}

export default ImageUploader;