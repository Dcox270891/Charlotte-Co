import React, {useState, useEffect} from "react";
import InputText from "../../components/Input/InputText";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Submit from "../Buttons/Submit";
import API from "../../utils/API";

function ImageUploader(props){
    const [  title, setTitle ] = useState("");
    const [  imageToUpload, setImageToUpload ] = useState({});
    const [  images, setImages ] = useState([])

    useEffect(() => {
        API.getAllImages()
            .then(res => setImages(res.data))
            .catch(err => console.log(err))
    },[])

    function saveImage(e){
        e.preventDefault();
        const newImage ={
            title: title,
            fileToUpload: imageToUpload,
        }
        console.log(newImage)
        API.postImage(newImage)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return(<>
        <form className="image-uploader">
            <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image Title"
            />
            <button 
                id="upload_widget" 
                className="cloudinary-button"
            >
                Upload files
            </button>
            <Submit
                onChange={(e) => saveImage(e)}
            />
        </form>
        <div>
            {images.map(image => {
                return (<div key={image._id}>
                    <h3>{image.title}</h3>
                    <img src={image.url}/>
                </div>)
            })}

        </div>
    </>)
}

export default ImageUploader;