import React, { useState, useEffect } from "react";
import API from "../../utils/API";

function ImageGallery(props){
    const [ forProduct, setForProduct ] = useState((props.forProduct)?(props.forProduct):"");
    const [ forTransfer, setForTransfer ] = useState((props.forTransfer)?(props.forTransfer):"");
    const [ images, setImages ] = useState([]);
    const [ mainImage, setMainImage ] = useState({});

    function ChooseImage(e, i){
        e.preventDefault();
        setMainImage(i);
    }

    useEffect(() => {
        API.findImageByProduct(forProduct)
            .then(res => {
                setImages(res.data);
            })
            .catch(err => console.log(err))
    },[forProduct])

    useEffect(() => {
        API.findImageByTransfer(forTransfer)
            .then(res => {
                setImages(res.data);
            })
            .catch(err => console.log(err))
    },[forTransfer])

    return(<>
        <div>
            <img
                src={mainImage.url}
                alt={mainImage.title}
            />
            <p>{mainImage.title}</p>
            <p>This is currently your main image</p>
        </div>
        {(images.length>0)?(
            images.map(image => {
                return <div 
                    onClick={(e) => ChooseImage(e)}
                    key={image._id}
                >
                    <img 
                        src={image.url}
                        alt={image.title}
                    />
                    <p>{image.title}</p>
                </div>
            })):(<p>No images uploaded yet</p>)
        }
    </>)


}

export default ImageGallery;