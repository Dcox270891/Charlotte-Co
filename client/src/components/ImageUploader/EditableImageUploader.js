import React, { useState } from "react";
import axios from "axios";
import Delete from "../Buttons/Delete";
import Picture from "../Picture/Picture";

function EditableImageUploader(props){
    const [  loading, setLoading ] = useState(false);
    const editableArea = document.querySelector(".editableArea");
    const pictureEdit = document.querySelector(".pictureEdit");

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

    function moveDiv(e){
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseRelease);
        let prevX = e.screenX;
        let prevY = e.screenY;
        let newX;
        let newY;
        
        function mouseMove(e){     
            newX = prevX - e.screenX;
            newY = prevY - e.screenY;
            console.log(prevY)
            console.log(`Y = ${e.clientY}`)
            console.log(prevX)
            console.log(`X = ${e.clientX}`)
    
            const rect = editableArea.getBoundingClientRect()
            let divLeft = rect.left - newX;
            let divTop = rect.top - newY;
            editableArea.style.left = (divLeft ) + "px";
            editableArea.style.top = (divTop ) + "px";
        }
        
        function mouseRelease(e){
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseRelease);
            
            prevX = e.screenX;
            prevY = e.screenY; 
            newX = 0;
            newY = 0;
        }
    }

    return(<>
        <div className="image-uploader">
            {(props.images)?"":(<input
                type="file"
                name="file"
                placeholder="Upload a File"
                className="uploader"
                onChange={uploadImage}
            />)}
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
                         {

                         }   <Picture
                                className="pictureEdit"
                                publicId={image.public_id}
                                version={image.version}
                                width="300"
                                quality="100"
                            />
                            <div 
                                className="editableArea"
                                onMouseDown={(e)=> moveDiv(e)}
                            >
                                <div className="resizer north"></div>
                                <div className="resizer west"></div>
                                <div className="resizer south"></div>
                                <div className="resizer east"></div>
                                The transfer will spread accross this box.
                            </div>
                        </>)
                    })
                ):(<p>No blank image avaiable currently. Upload one to make this option avaiable.</p>)}
            </div>
        </div>
    </>)
}

export default EditableImageUploader;