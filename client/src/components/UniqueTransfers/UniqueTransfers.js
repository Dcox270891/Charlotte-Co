import React, {useState, useEffect} from "react";
import Submit from "../Buttons/Submit";
import InputText from "../Input/InputText";
import InputNumber from "../Input/InputNumber";
import Close from "../Buttons/Close";
import ImageUploader from "../ImageUploader/ImageUploader";
import Picture from "../Picture/Picture";
import API from "../../utils/API";

function UniqueTransfers(props){
    const [  title, setTitle  ] = useState();
    const [  transferDescription, setTransferDescription  ] = useState();
    const [  transferImages, setTransferImages  ] = useState([]);
    const [  mainTranferImage, setMainTranferImage  ] = useState();
    const [  priceDifference, setPriceDifference  ] = useState();
    const [  transferArray, setTransferArray ] = useState([]);

    useEffect(() => {
        API.getTransferByProduct(props.product)
            .then(res => setTransferArray([...res.data, transferArray]))
            .catch(err => console.log(err))
    },[props.product])

    
    function addTransfer(e){
        const transfer={
            forProduct: props.product,
            title: title,
            transferDescription: transferDescription,
            transferImages: transferImages,
            mainTranferImage: mainTranferImage,
            priceDifference: priceDifference,
        }
        e.preventDefault();
        API.newTransfer(transfer)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTransferArray([...transferArray, transfer ]);
        setTitle("");
        setTransferDescription("");
        setTransferImages([]);
        setPriceDifference("");
        setMainTranferImage("");
    }
    
    function removeTransfer(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        API.deleteTransfer(remove);
        setTransferArray(transferArray.filter(transfer => transfer !== remove));
    }

    return(<>
        <form className="add-product">
            <h2>Transfers</h2>
            <ul>
                Saved Transfers: 
                {(transferArray.length>=1)?(transferArray.map(transfers => {
                    return <li key={transfers._id}>
                        Title :{transfers.title}<br/>
                        Description :{transfers.transferDescription}<br/>
                        Main Image :{(transfers.mainTranferImage)?(<Picture 
                            publidId={transfers.mainTranferImage[0].public_id}
                            version={transfers.mainTranferImage[0].version}
                            width="250"
                            scale="60"
                        />):("")}
                        Other Images :{(transfers.transferImages)?(transfers.transferImages.map(image =>{
                            return(<Picture 
                                publidId={image.public_id}
                                version={image.version}
                                width="100"
                                scale="30"
                            />)
                        })):""}<br/>
                        Price Difference :{transfers.priceDifference}<br/>
                        <Close
                            remove={transfers._id}
                            onClick={(e) => {removeTransfer(e)}}
                        />
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
                images={transferImages}
                setImages={setTransferImages}
            />
            <Submit
                onClick={addTransfer}
            />
        </form>
    </>)
}

export default UniqueTransfers;