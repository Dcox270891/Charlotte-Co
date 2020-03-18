import React, { useState , useEffect } from "react";
import Picture from "../Picture/Picture";

function Gallery(props){
    const [ mainImage, setMainImage ] = useState();
    const [ images, setImages ] = useState();

    function selectImage(i){
        console.log(i)
        setMainImage(images[i])
    }

    useEffect(() => {
        if(props.images){
            setMainImage(props.images[0]);
            setImages(props.images);
        }
    },[props.images])

    return(<>
        <div className="gallery">
            <div className="gallery-main">
                {(mainImage !== undefined)?(<Picture
                    publicId={mainImage.public_id}
                    version={mainImage.version}
                    width="250"
                    quality="100"
                />):""}
            </div>
            <div className="gallery-images">
                {(images)?(images.map((image, i) => {
                    return <div
                        onClick={() => selectImage(i)}
                        value={i}
                    >
                        <Picture
                            publicId={image.public_id}
                            version={image.version}
                            width="100"
                            quality="20"
                        />
                    </div>
                })):""}
            </div>
        </div>
    </>)
};

export default Gallery;