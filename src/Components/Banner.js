import React from "react";
import "./Banner.css";

const Banner = () => {
  const bannerImg = {
    imgPc: "../img/3.jpg", // đường dẫn ảnh banner cho PC
    imgMb: "../img/3.jpg", // đường dẫn ảnh banner cho mobile (tuỳ chọn)
  };

  return (
    <section className="banner-homepage">
      <div className="banner-slider">
        <div className="slide">
          <picture>
            <source media="(max-width: 768px)" srcSet={bannerImg.imgMb} />
            <img
              src={bannerImg.imgPc}
              alt="Medical Banner"
              className="banner-image"
            />
          </picture>
        </div>
      </div>

      {/* --- Nội dung chữ (nếu muốn thêm) --- */}
      <div className="banner-content">
        <div className="container">
          <div className="text-banner">
            <h1 className="title-banner">Welcome to MediConnect</h1>
            <p>Book your medical appointments with trusted doctors easily.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
