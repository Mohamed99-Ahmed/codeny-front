"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import headerSlider1 from "../../../public/imgs/header1.jpg";
import headerSlider2 from "../../../public/imgs/header2.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Slider() {
  return (
    <section>
      <div className="container">
        {/* start slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500, // Continuous autoplay
            disableOnInteraction: false, // Keep autoplay running
          }}
          loop={true}
          speed={3000} // Controls scroll speed
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <Image
              alt="first Image slider"
              src={headerSlider1}
              className="h-[50vh] object-contain md:h-[70vh]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="first Image slider"
              src={headerSlider2}
              className="h-[50vh] object-contain md:h-[70vh]"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
