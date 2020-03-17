import React, { useState } from "react";
import axios from "axios";
import Delete from "../Buttons/Delete";
import Picture from "../Picture/Picture";

function ImageUploader(props){
    const [  loading, setLoading ] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'charlotte-co')
        setLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/charlotte-co/image/upload', data)
            .then(res => {
                setLoading(false);
                props.setImages([...props.images, res.data]);
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
                                delete={image.public_id}
                                deleteFrom={props.images}
                                setDeleteFrom={props.setImages}
                            />
                            <Picture
                                publicId={image.public_id}
                                version={image.version}
                                width="100"
                                quality="20"
                            />
                        </>)
                    })
                ):(<p>No images saved</p>)}
            </div>
        </div>
    </>)
}

export default ImageUploader;