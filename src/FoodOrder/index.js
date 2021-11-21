import React from "react";
import FoodComponent from "../Components/FoodComponent";
import { HomeIcon, LockClosedIcon } from "@heroicons/react/solid";
import { ChatIcon, CogIcon, XIcon } from "@heroicons/react/outline";
import CartItem from "../Components/CartItem";
import "./style.css";
import CategoryComponent from "../Components/CategoryComponent";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "../axios";
import Modal from "react-modal";
import { Form, Row, Col, Button } from "react-bootstrap";
import {ACT_TYPE} from "../util/constans"
import {Redirect} from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainSideBarComponent from "../Components/MainSideBar/MainSideBar";


const DATA = [
  {
    id: 1,
    image: process.env.PUBLIC_URL + `/images/item.png`,
    name: "Bell Pepper Pizza",
    price: "12.99",
  },
  {
    id: 2,
    image:
      "https://www.kitchensanctuary.com/wp-content/uploads/2015/03/Fried-Rice-square-FS.jpg",
    name: "Bell Pepper Pizza",
    price: "12.99",
  },
  {
    id: 3,
    image: process.env.PUBLIC_URL + `/images/item.png`,
    name: "Bell Pepper Pizza",
    price: "12.99",
  },
  {
    id: 4,
    image: process.env.PUBLIC_URL + `/images/item.png`,
    name: "Bell Pepper Pizza",
    price: "12.99",
  },
];

const CATEGORY_DATA = [
  {
    id: 1,
    title: "rice",
    icon: process.env.PUBLIC_URL + `/images/pizza.png`,
  },
  {
    id: 2,
    title: "burger",
    icon: process.env.PUBLIC_URL + `/images/burger.png`,
  },
  {
    id: 3,
    title: "pizza",
    icon: process.env.PUBLIC_URL + `/images/rice.png`,
  },
  {
    id: 4,
    title: "hot",
    icon: process.env.PUBLIC_URL + `/images/pizza.png`,
  },
  {
    id: 5,
    title: "devilled",
    icon: process.env.PUBLIC_URL + `/images/rice.png`,
  },
];

function FoodOrder() {
  let subtitle;
  const [picked, setPicked] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [foodItems, setFoodItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [billTotal, setBillTotal] = useState(0.0);
  const [proceedToPay, setProceedToPay] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "2rem",
      width: "16vw",
      transform: "translate(-50%, -50%)",
    },
  };
  const notify = () => 
  toast.success('You Order has been placed', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  const setItemsCart = (element, qty) => {
    let item = {
      element: element,
      qty: qty,
    };

    setCartItems([...cartItems, item]);
    setQuantity(0);
    handleClose();
    setProceedToPay(false);
    setBillTotal(
      billTotal + parseFloat(item.qty) * parseFloat(item.element.price)
    );
    createFoodOrder(item);
  };

  useEffect(() => {
    getSelectedCategory(selectedCategoryId);
    return () => {};
  }, []);
  async function getSelectedCategory(selectedCategoryId) {
    await axios
      .get(`/api/customer/save/FoodMenu/FoodCategory/${selectedCategoryId}`)
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.error(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
            console.log(error);
        }
      });
  }

  async function createFoodOrder(item){
      await axios.post("/api/order/newitem",{
        foodie: item.element.food_id,
        quantity: item.qty,
        cusId : localStorage.getItem("cus_id")
      }).then((response) => {
        console.log(response)
      })
      .catch(function (error) {
        if (error.response) {
          console.error(error.response)
        } else if (error.request) {
          console.log(error.request);
        } else {
            console.log(error);
        }
      });
  }

  async function createOrder(){
    await axios.post("/order/neworder",{
      actId: ACT_TYPE.PENDING,
      cusId : localStorage.getItem("cus_id"),
      totalPrice: parseFloat(billTotal*0.9),
      tableNum: 1
    }).then((response) => {
      setTimeout(() => {
        window.location = "/customer-safety"
      }, 3000);

    })
    .catch(function (error) {
      if (error.response) {
        console.error(error.response)
      } else if (error.request) {
        console.log(error.request);
      } else {
          console.log(error);
      }
    });
}

  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex relative">
        <ToastContainer />
        <MainSideBarComponent type={"Home"} />
        <div className="flex-1 py-6 px-5">
          <div className="mb-5">
            <h1 className="text-4xl font-semibold text-gray-500">
              Menu Category
            </h1>
            <div className="flex justify-between mt-10">
              {CATEGORY_DATA.map((element) => (
                <button
                  className="btn"
                  onClick={(e) => {
                    setSelectedCategoryId(element.id);
                    getSelectedCategory(element.id);
                  }}
                >
                  <CategoryComponent
                    key={element.id}
                    active={selectedCategoryId == element.id}
                    icon={element.icon}
                    title={element.title}
                  />
                </button>
              ))}
            </div>
            <h1 className="text-4xl font-semibold text-gray-500 my-6">
              Pick Your Favourite
            </h1>
          </div>
          {foodItems.length > 0 ? (
            <div className="flex-1 grid grid-cols-4 py-10 relative">
              <div
                className={`absolute z-30 top-0 right-0 left-0 bottom-0 w-full h-full glass ${
                  picked ? "block" : "hidden"
                }`}
              ></div>
              {foodItems.map((element) => (
                <button
                  className="btn"
                  onClick={() => {
                    handleShow();
                    setSelectedElement(element);
                  }}
                >
                  <FoodComponent
                    key={element.food_id}
                    image={element.image}
                    name={element.name}
                    price={element.price}
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-start justify-center bg-gray-300">
              <p className="text-center text-2xl bg-gray-300 px-8 py-4 ">
                No Items
              </p>
            </div>
          )}
        </div>
        <div className="w-1/4 px-4 py-10 relative">
          <h1 className="text-4xl font-semibold mb-10">Order Menu</h1>
          {cartItems.length === 0 ? (
            <div className="flex items-start justify-center">
              <p className="text-center text-2xl bg-gray-300 px-8 py-4 rounded-full">
                No Items
              </p>
            </div>
          ) : (
            <div>
              <div className="cart-property">
                {cartItems.map((item) => {
                  return (
                    <CartItem
                      image={item.element.image}
                      name={item.element.name}
                      quantity={item.qty}
                      price={item.element.price}
                    />
                  );
                })}
              </div>
              <div className="w-11/12 h-1 border-2 border-dashed border-gray-400 mx-auto" />
              {!proceedToPay && (
                <>
                  <div className="px-3 mt-6">
                    <div className="flex text-2xl font-semibold text-gray-600">
                      <p className="flex-1">Sub Total</p>
                      <p>${billTotal}</p>
                    </div>
                    <div className="flex text-2xl font-semibold text-gray-600 mt-2">
                      <p className="flex-1">Discount(10%)</p>
                      <p>${billTotal * 0.1}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {!proceedToPay && (
            <div
              className={`${
                cartItems.length === 0 ? "opacity-60" : "opacity-100"
              } order-btn-properties absolute bottom-10 left-1/2 transform -translate-x-1/2 px-10 py-5 bg-pink text-white rounded-full flex items-center justify-center cursor-pointer`}
            >
              <button
                className="btn btn-block text-white"
                onClick={() => {
                  setProceedToPay(true);
                }}
              >
                {cartItems.length === 0 ? (
                  <LockClosedIcon className="w-10 h-10 text-gray-50 block" />
                ) : (
                  <p className="text-3xl font-semibold">
                    Order ${billTotal - billTotal * 0.1}
                  </p>
                )}
              </button>
            </div>
          )}
          {proceedToPay && (
            <>
              <div className="row mt-2 justify-content-around">
                <div className="col-4 payment-method-properties">
                  <img
                    src={process.env.PUBLIC_URL + "/images/card_payment.png"}
                  ></img>
                </div>
                <div className="col-4 payment-method-properties">
                  <img
                    src={process.env.PUBLIC_URL + "/images/cash_payment.png"}
                  ></img>
                </div>
              </div>
              <div className="row mt-2 justify-content-around">
                <div className="col-4 payment-method-properties">
                  <button className="btn btn-block bg-pink text-white" onClick={() =>{
                      notify();
                      createOrder();
                  }}>Card</button>
                </div>
                <div className="col-4 payment-method-properties">
                  <button className="btn btn-block bg-pink text-white"  onClick={() =>{
                      notify();
                      createOrder();
                  }}>Cash</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FoodComponent
          key={selectedElement.food_id}
          image={selectedElement.image}
          name={selectedElement.name}
          price={selectedElement.price}
        />
        <div className="form-group row">
          <label
            htmlFor="elementName"
            className="col-sm-4 col-form-label font-size-12 align-text-left"
          >
            Quantity
          </label>
          <div className="col-sm-7">
            <input
              className="form-control theam-textbox items-align-left"
              type="number"
              id="elementName"
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
              }}
            />
          </div>
        </div>

        <Button
          className="bg-pink text-white rounded-full"
          onClick={() => {
            setItemsCart(selectedElement, quantity);
          }}
        >
          Add To Cart
        </Button>
      </Modal>
    </>
  );
}

export default FoodOrder;
