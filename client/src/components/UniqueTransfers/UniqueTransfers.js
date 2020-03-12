import React, {useState, useEffect} from "react";
import Submit from "../Buttons/Submit";
import InputText from "../Input/InputText";
import InputNumber from "../Input/InputNumber";
import Close from "../Buttons/Close";
import ImageUploader from "../ImageUploader/ImageUploader";
import API from "../../utils/API";
import ImageGallery from "../ImageGallery/ImageGallery";

function UniqueTransfers(props){
    const [  title, setTitle  ] = useState((props.product)?(props.product.title):"");
    const [  transferDescription, setTransferDescription  ] = useState((props.product)?(props.product.transferDescription):"");
    const [  transferImages, setTransferImages  ] = useState((props.product)?(props.product.transferImages):[]);
    const [  mainTranferImage, setMainTranferImage  ] = useState((props.product)?(props.product.mainTranferImage):"");
    const [  priceDifference, setPriceDifference  ] = useState((props.product)?(props.product.priceDifference):"");
    const [  transferArray, setTransferArray ] = useState((props.product)?(props.product.transferArray):[]);

    if(props.product){
        API.getTransferByProduct(props.product)
            .then(res => setTransferArray([...res, transferArray]))
            .catch(err => console.log(err))
    }
    
    function addTransfer(e){
        const transfer={
            title: title,
            transferDescription: transferDescription,
            transferImages: transferImages,
            mainTranferImage: mainTranferImage,
            priceDifference: priceDifference,
        }
        e.preventDefault();
        setTransferArray([...transferArray, transfer ]);
        setTitle("");
        setTransferDescription("");
        setTransferImages([]);
        setPriceDifference("");
        setMainTranferImage("");
        API.newTransfer(transfer)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    
    function removeTransfer(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        setTransferArray(transferArray.filter(transfer => transfer !== remove));
        API.deleteTransfer(e.target.getAttribute("remove"))
    }

    return(<>
        <form className="unique-transfers">
            <h2>Transfers</h2>
            <ul>
                Saved Transfers: 
                {(transferArray.length>1)?(transferArray.map(transfers => {
                    return <li key={transfers._id}>
                        Title :{transfers.title}<br/>
                        Description :{transfers.transferDescription}<br/>
                        Main Image :{transfers.mainTranferImages}<br/>
                        Other Images :{transfers.transferImages}<br/>
                        Price Difference :{transfers.priceDifference}<br/>
                        Need to add a button to edit this transfer here
                        <Close remove={transfers._id} onClick={removeTransfer}/>
                    </li>
                })):("No saved transfers")}
            </ul>
            <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <InputText
                value={transferDescription}
                onChange={(e) => setTransferDescription(e.target.value)}
                placeholder="Transfer Description"
            />
            <InputNumber
                value={priceDifference}
                onChange={(e) => setPriceDifference(e.target.value)}
                placeholder="Price Difference"
            />
            <ImageUploader
                imageInfo={`forTransfer: ${props.product}`}
            />
            <ImageGallery
                forTransfer=""
            />
            <Submit
                onClick={addTransfer}
            />
        </form>
    </>)
}

export default UniqueTransfers;