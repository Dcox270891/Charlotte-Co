import React, {useState, useEffect} from "react";
import InputText from "../../components/Input/InputText";
import Submit from "../Buttons/Submit";
import API from "../../utils/API";

function ImageUploader(props){
    const [  title, setTitle ] = useState("");
    const [  imageToUpload, setImageToUpload ] = useState({});
    const [  images, setImages ] = useState([])

    useEffect(() => {
        if(props){
            API.getAllImages()
                .then(res => setImages(res.data))
                .catch(err => console.log(err))
        } else {
            if("product" in props){
                API.findImageByProduct(props.product._id)
                    .then(res => setImages(res.data))
                    .catch(err => console.log(err))

            } else if("transfer" in props){
                API.findImageByTransfer(props.transfer._id)
                    .then(res => setImages(res.data))
                    .catch(err => console.log(err))
            }
        }
    },[])

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
            if ("product" in props){
                API.postImage({
                    ...newImage,
                    forProduct: props.product._id,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            } else if ("transfer" in props) {
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