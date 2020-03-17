import React, { useState } from "react";
import { Image, Transformation } from 'cloudinary-react';
import axios from "axios";
import Delete from "../Buttons/Delete";

function ImageUploader(props){
    const [  newImage, netNewImage ] = useState();
    const [  loading, setLoading ] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'charlotte-co')
        setLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/charlotte-co/image/upload', data)
            .then(res => {
                console.log(res.data)
                netNewImage(res.data);
                setLoading(false);
                props.setImages([...props.images, newImage]);
            })
            .catch(err =>console.log(err));
    }

    console.log(props.images)

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
                        return (<>
                            <Delete 
                                delete={image.signature}
                                deleteFrom={props.images}
                                setDeleteFrom={props.setImages}
                            />
                            <Image publicId={image.public_Id} >
                                <Transformation width="200" height="200" crop="scale"  quality="10"/>
                            </Image>
                        </>)
                    })
                ):(<p>No images saved</p>)}
            </div>
        </div>
    </>)
}

export default ImageUploader;