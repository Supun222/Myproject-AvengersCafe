import React from "react";
import "./OrderStyles.css";
import Slider from "react-slick";
import OrderCardComponent from "./OrderCardComponent";

function OrderComponent() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight:true,
  };

  return (
    <>
      <div style={{maxWidth: "90vw",}}>
        <Slider {...settings}>
          <OrderCardComponent key={1}/>
          <OrderCardComponent key={2}/>
          <OrderCardComponent key={3}/>
          <OrderCardComponent key={4}/>
          <OrderCardComponent key={5}/>
          <OrderCardComponent key={6}/>
          <OrderCardComponent key={7}/>
        </Slider>
      </div>
    </>
  );
}

export default OrderComponent;
