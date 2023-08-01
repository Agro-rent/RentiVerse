import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Header, Sidebar } from "../../components";
import "./ProductPage.css";
import rentiVerseLoadingGif from "../../assets/rentiVerseLoadingGif.gif";

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const productInfo = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/item/item-info/${productId}`
        );

        if (result.status === 200) {
          setProduct(result.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          window.alert("Product not found");
        } else {
          window.alert("Error fetching product");
        }
      } finally {
        setIsLoading(false);
      }
    };

    productInfo();
  }, [productId]);


  const formSubmissionHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="body-productpage">
      <Header />
      <Sidebar />
      
      {isLoading || !product ? (
        <div>
          <img src={rentiVerseLoadingGif} className="rentiVerseLoadingGif" alt="Loading..." />
        </div>
      ) : (
        <>
        <div className="container-productpage">
          <h1 className="title-productpage">Renting Request</h1>
        </div>
          <div className="container-productpage" id="white-box">
            <div className="left-box">
              <h2 className="heading-productpage">{product.toolName}</h2>
              <div className="gallery-productpage">
                <img className="big-image image" src={product.toolImages[0].secure_url} alt="Product" />
                <div className="small-images">
                  <img
                    className="small-images-productpage image"
                    src={product.toolImages[1].secure_url}
                    alt="Product"
                  />
                  <img
                    className="small-images-productpage image"
                    src={product.toolImages.length===2?(product.toolImages[0].secure_url):product.toolImages[2].secure_url}
                    alt="Product"
                  />
                  <img
                    className="small-images-productpage image"
                    src={product.toolImages.length===2?(product.toolImages[1].secure_url):product.toolImages[3].secure_url}
                    alt="Product"
                  />
                </div>
              </div>
            </div>
            <div className="right-box">
              <h3 className="owner-productpage">
                <span className="author">By </span> {product.ownerName}
              </h3>
              <button className="grey-button">{product.toolPrice} Rs/day</button>
              <p className="description-productpage">
                Description: <br /> {product.toolDesc}
              </p>
              <form onSubmit={formSubmissionHandler}>
                <label className="label-productpage" htmlFor="till-date">
                  Available Quantity:
                </label>
                <button className="grey-button">{product.toolQuantity}</button>
                <label className="label-productpage" htmlFor="till-date">
                  Due Date:
                </label>
                <input
                  className="input-productpage-date"
                  type="date"
                  id="till-date"
                  name="till-date"
                  placeholder="DD/MM/YY"
                  value={(product.dueDate).split("T")[0]}
                  disabled
                />
                <label className="label-productpage" htmlFor="message">
                  Message:
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="Add message for owner here"
                  />
                </div>
                <input
                  className="submit-button-productpage"
                  type="submit"
                  value="Send Request"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPage;
