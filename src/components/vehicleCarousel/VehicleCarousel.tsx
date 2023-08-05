import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {v4 as uuidv4} from "uuid";

import "./stylesCarousel.scss";

import {FreeMode, Navigation, Thumbs, Autoplay, Pagination} from "swiper";
import ReactImageMagnify from "react-image-magnify";
import {Box, Modal, useMediaQuery} from "@mui/material";
import ModalGallery from "../modalGallery/ModalGallery";


export const VehicleCarousel: React.FC<any> = ({photos}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const showingBullets: number = 4;
  const remainingPhotos: number = photos.length - showingBullets;


  const rimProps = {
    // isHintEnabled: false,
    // shouldHideHintAfterFirstActivation: false,
    // enlargedImagePosition: "over"
    enlargedImagePortalId: "portal",
    enlargedImageContainerDimensions: {
      width: "100%",
      height: "100%"
    }
  };

  // interface CustomPaginationOptions extends PaginationOptions {
  //   paginationBulletRender?: (swiper: any, index: any, className: any) => string;
  // }


  const handleMore = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    handleOpen();
  };
  const matchesXS = useMediaQuery("(min-width:600px)");
  return (
    <div  style={{
      height:!matchesXS ? "auto" :"auto",
      backgroundColor:"white",
      borderRadius:!matchesXS ? "0" :"10px",
      paddingBottom:!matchesXS ? "0" :"10px",
      boxShadow:!matchesXS ? "" :"2px 4px 8px rgba(34, 38, 42, 0.05), 4px 8px 24px rgba(34, 38, 42, 0.1)",
    }}>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        thumbs={{swiper: thumbsSwiper}}
        modules={[Autoplay,Pagination, Navigation, Thumbs]}
        pagination={{
          dynamicBullets: true,
        }}
        navigation
        loop={!matchesXS}
        grabCursor
        className='mySwiper2'
        style={{
          height:"50vh",
          marginBottom:"0",
          borderRadius: !matchesXS ? 0 : 10,
          padding:!matchesXS ? 0 :  10
      }}
      >
        {
          photos.map((item: any, idx: number) => (
            <SwiperSlide key={`slide-${idx}`}
                         style={{
                           // width: "100%",
                           // objectFit: "cover"
                         }}
            >
              {
                matchesXS ? (
                  <ReactImageMagnify {...{
                    smallImage: {
                      alt: `cImg-${idx}`,
                      isFluidWidth: true,
                      src: item.url
                    },
                    largeImage: {
                      src: item.url,
                      width: 1000,
                      height: 1000
                    }
                  }}
                                     {...rimProps}

                  />
                ): <img src={item.url} alt={`cImg-${idx}`} className="thumbnail-slide-image" />
              }

            </SwiperSlide>
          ))
        }

      </Swiper>
      <Swiper
        initialSlide={1}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={showingBullets}
        freeMode={false}
        loop={false}
        watchSlidesProgress
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper display_none_mobile"

        // onSwiper={(swiper) => {
        //   setThumbsSwiper(swiper);
        //   swiper.update(); // call the update() method to update the Swiper's state
        // }}


      >
        {
          photos.map((item: any, idx: number) => {

              if (idx === 3 && photos.length > showingBullets) {
                return (
                  <SwiperSlide key={`thumbnail-slide-${idx}`}
                               onClick={handleMore}
                               style={{
                                 height:"auto",
                                 maxHeight:"80px",
                                 cursor:"pointer",
                  }}
                  >
                    <div className="overlay-container">
                      <img src={item.url} alt={`cImg-${idx}`}  className="thumbnail-slide-image"/>

                      <div className="overlay-text-centered">
                        <div style={{fontSize: "2rem"}}>
                          {`+${remainingPhotos}`}
                         </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
              if (idx < showingBullets) {
                return (
                  (
                    <SwiperSlide key={uuidv4()}
                                 style={{height:"",cursor:"pointer"}}
                    >
                      <img src={item.url} alt={`cImg-${idx}`} className="thumbnail-slide-image" />
                    </SwiperSlide>
                  )
                );
              }
              return <React.Fragment key={uuidv4()}/>;
            }
          )
        }
      </Swiper>

      {photos.length > 4 && (
        <ModalGallery  photos={photos}
                      handleClose={handleClose}
                      open={open} />
      )}


    </div>
  );
};


export default VehicleCarousel;
