import "./styles.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/extensions,import/no-unresolved
import SwiperClass from "swiper/types/swiper-class";

import {useDevice} from "@ecommerce-ozon/design_system";


import HERO_IMG_1 from "../../static/images/banner/banner-1.gif";
import HERO_IMG_2 from "../../static/images/banner/banner-2.png";
import HERO_IMG_3 from "../../static/images/banner/banner-3.png";


import { Cities } from "../../store/reducers/cityReducer";
import useCurrentCity from "../../hooks/useCurrentCity";


const SliderImages = {
  [Cities.GUADALAJARA]: [
    {
      desktop: HERO_IMG_1, mobile: HERO_IMG_1, onClick: () => {
        
      }
    },
    {
      desktop: HERO_IMG_2, mobile: HERO_IMG_2, onClick: () => {
      }
    },
    {
      desktop: HERO_IMG_3, mobile: HERO_IMG_3, onClick: () => {
      }
    }
  ],
  [Cities.CDMX]: [
    {
      desktop: HERO_IMG_1, mobile: HERO_IMG_1, onClick: () => {
      }
    },
    {
      desktop: HERO_IMG_2, mobile: HERO_IMG_2, onClick: () => {
      }
    },
    {
      desktop: HERO_IMG_3, mobile: HERO_IMG_3, onClick: () => {
      }
    }
  ]
};

const resolveSlideImages = (city?: Cities) => {
  if (!city) return SliderImages[Cities.CDMX];
  return SliderImages[city];
};

// const textWA = `Hola, quiero unir a un amig@ a la onda ozon, me das más información por favor 😎.
//   Su nombre es:`;

const Hero = () => {
  const history = useHistory();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [slider, setSlider] = useState({ current: 0 });
  const city = useCurrentCity();
  const { isMobile } = useDevice();
  const [images, setImages] = useState(resolveSlideImages(city));

  useEffect(() => {
    setImages(resolveSlideImages(city));
  }, [city]);

  const slideTo = (index: any) => {
    if (swiperRef) swiperRef.slideTo(index - 1, 0);
  };

  // const ozocio = () => {
  //   history.push("/vende-tu-moto");
  // };
  //
  // const goGrid = () => history.push("/catalogo");
  //
  // const goWA = () =>
  //   window.open(
  //     `https://api.whatsapp.com/send?phone=525540692049&text=${textWA}`,
  //     "_blank"
  //   );

  return <section className="display_flex flex_col">
    <Swiper
      autoplay={{
        delay: 3500,
        disableOnInteraction: false
      }}
      onSwiper={setSwiperRef}
      className="dim_100_per m_t_md"
      onSlideChange={() => {
        setSlider({ current: swiperRef ? swiperRef.activeIndex : 0 });
      }}
    >
      {
        images.map((sliderItem, index) => (<SwiperSlide key={`herosec-${index}`}>
          <img
            src={isMobile ? sliderItem.mobile : sliderItem.desktop}
            alt="moto"
            onClick={() => {
              history.push("/catalogo");
            }}
            className="w_100_per_mobile w_85_per_desktop cursor_pointer"
          />
        </SwiperSlide>))
      }
    </Swiper>
    <div className="custom-slider">
      {
        images.map((_, index) => (
          <div
            className={`slider-point ${slider.current === index ? "active" : ""}`}
            onClick={() => slideTo(index + 1)} key={`heros-${index}`}
          />)
        )
      }
    </div>
  </section>;
};

export default Hero;
