import React, {useState, useEffect} from "react";
import InputText from "../../components/Input/InputText";
import Submit from "../Buttons/Submit";
import API from "../../utils/API";

function ImageUploader(props){
    const [  title, setTitle ] = useState("");
    const [  imageToUpload, setImageToUpload ] = useState();

    function saveImage(e){
        e.preventDefault();
        const newImage ={
            title: title,
            fileToUpload: imageToUpload,
        }
        console.log(newImage)
        if(props === {}){
            API.postImage(newImage)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } else { 
            if (props.product._id !== null || ""){
                API.postImage({
                    ...newImage,
                    forProduct: props.product._id,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            } else if (props.transfer._id !== null || "") {
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
        const file = e.target.files[0];
        setImageToUpload(file);
        console.log(imageToUpload)
    }

    return(<>
        <h1> show up please</h1>
        <form className="image-uploader">
            <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image Title"
            />
            <input 
                id="Image"
                type="file"
                onChange={(e) => onChangeFile(e)}
            />
            <Submit
                onChange={(e) => saveImage(e)}
            />
        </form>
    </>)
}

export default ImageUploader;