import React, { useState, useEffect } from "react";
import API from "../../utils/API";

function ImageGallery(props){
    const [ images, setImages ] = useState([]);
    const [ mainImage, setMainImage ] = useState({});

    if(forProduct in props){
        API.findImageByProduct(props.forProduct)
            .then(res => setImages(res.data))
            .catch(err => console.log(err))
    } else if(forTransfer in props){
        API.findImageByTransfer(props.forTransfer)
            .then(res => setImages(res.data))
            .catch(err => console.log(err))
    };

    function ChooseImage(e, i){
        e.preventDefault();
        setMainImage(i);
    }

    return(<>
        <div>
            <img
                src={mainImage.url}
                alt={mainImage.title}
            />
            <p>{mainImage.title}</p>
            <p>This is currently your main image</p>
        </div>
        {(images.length>1)?(
            images.map((image, i) => {
                <div 
                    onClick={(e) => ChooseImage(e, i)}
                    key={image._id}
                >
                    <img 
                        src={image.url}
                        alt={image.title}
                    />
                    <p>{image.title}</p>
                </div>
            })):""
        }
    </>)


}

export default ImageGallery;