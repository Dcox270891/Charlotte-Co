import React, {useState, useEffect} from "react";
import axios from "axios";
import InputText from "../../components/Input/InputText";
import Submit from "../Buttons/Submit";
import API from "../../utils/API";

function ImageUploader(props){
    const [  title, setTitle ] = useState("");
    const [  image, setImage ] = useState([]);
    const [  loading, setLoading ] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'charlotte-co')
        setLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/charlotte-co/image/upload', data)
            .then(res => {
                setImage(res.data.secure_url)
                console.log(res)
                setLoading(false)
            })
            .catch(err =>console.log(err));
    }

    function saveImage(e){
        let newImage = {
            title: title,
            url: image,
        }
        if(props.imageInfo){
            newImage = {
                ...props.imageInfo,
                title: title,
                url: image
            }
        }
        e.preventDefault();
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
            <input
                type="file"
                name="file"
                placeholder="Upload a File"
                className="uploader"
                onChange={uploadImage}
            />
            <div>
                {loading ? (
                    <h4>loading...</h4>
                ):(
                    <img src={image}/>
                )}
            </div>
            <Submit
                onChange={(e) => saveImage(e)}
            />
        </form>
    </>)
}

export default ImageUploader;