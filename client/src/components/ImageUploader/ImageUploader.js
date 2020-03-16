import React, {useState, useEffect} from "react";
import axios from "axios";

function ImageUploader(props){
    const [  newImage, netNewImage ] = useState();
    const [  loading, setLoading ] = useState(false);
    const [ test, setTest ] =useState()

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'charlotte-co')
        setLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/charlotte-co/image/upload', data)
            .then(res => {
                netNewImage(res.data.secure_url);
                setLoading(false);
            })
            .catch(err =>console.log(err));
    }

    useEffect(()=> {
        console.log(props);
        console.log(newImage);
        console.log(test)
        props.setImages([...props.images, newImage]);
    },[newImage])

    return(<>
        <div className="image-uploader">
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
                ):""}
                {(props.images)?(
                    props.images.map(image => {
                        return <img src={image}/>
                    })
                ):(<p>No images saved</p>)}
            </div>
        </div>
    </>)
}

export default ImageUploader;