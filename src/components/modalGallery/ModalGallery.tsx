import React, {useEffect, useRef, useState} from "react";
import {Box, Container, Modal} from "@mui/material";
import { ReactComponent as Close } from "@ecommerce-ozon/design_system/dist/public/static/icons/close-lg.svg";



type ModalGalleryProps = {
  photos?: any;
  open: boolean;
  handleClose: any
}



const ModalGallery: React.FC<ModalGalleryProps> = ({photos, open, handleClose}) => {

  if(!photos) {
    return <> </>;
    // eslint-disable-next-line no-else-return
  }

  const [currentImage, setCurrentImage] = useState(photos[0].url);

  const handleSelectedImg = (selectedImg:string)=> {
    setCurrentImage(selectedImg);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{backgroundColor: "rgba(0,0,0,0.7)"}}
    >
      <Container maxWidth="md" className="" sx={{
        marginTop:"10vh",

      }}>
        <div onClick={handleClose}
          style={{position:"absolute", top:30, right:30 , cursor:"pointer"}}>
          <Close style={{fill:"white"}}
          />
        </div>
        <div style={{display:"flex", justifyContent:"center",  overflowX:"auto"}}>
          <img  src={currentImage} alt="currentImg" style={{
            width: "auto",
            maxWidth: "100%",
            height: "auto",
            minHeight:"65vh",
            borderRadius:"10px",
            padding:8}}
          />
        </div>
        <div style={{display:"flex", justifyContent:"center",  overflowX:"auto"}}>

          {photos.map((photo:any, idx:number) => (
            <div key={idx} onClick={()=>handleSelectedImg(photos[idx].url)}>
              <img src={photo.url} alt="slide"
                   style={{
                     height:"64px",
                     width:"100px",
                     borderRadius:"10px",
                     margin:"10px",
                     border: photos[idx].url === currentImage
                       ?  "2px solid orange"
                       : ""

              }}/>
            </div>
          ))}
        </div>
      </Container>
    </Modal>
  );
};

export default ModalGallery;
