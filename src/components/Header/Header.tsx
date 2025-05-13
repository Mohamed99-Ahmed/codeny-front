"use client";

const videoUrl = "/vidios/burgerVid.mp4";

// Import Swiper React components

export default function Header() {
  return (
    <>
      <header className="home ">
        <div className="vidioBurger ">
          <video
            src={videoUrl}
            className="max-h-[70vh] lg:max-h-[80vh]  w-full object-cover object-center"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </header>
    </>
  );
}
