import React, { useEffect, useState } from "react";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import API from "../../utils/API";
import "./style.css";

function ProductCard(props){
    const [  transfer, setTransfer  ] = useState();

    if (transfer in props){
        useEffect(() => {
            API.getTransfers(props.transfer._id)
                .then(res => setTransfer(res.data))
                .catch(err => console.log(err));
        }, [])
    }

    return(<>
        {(transfer)?(<div>
            <h3 className="transfer-title">{transfer.title}</h3>
            <Image publicId={transfer.mainTransferImage.url} type="fetch">
                <Transformation width="300" height="300" crop="fill" fetchFormat="auto" />
            </Image>
            <h3 className="transfer-price">{transfer.price}</h3>
        </div>):("")}
    </>)
}

export default ProductCard;