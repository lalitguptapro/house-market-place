import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import Slider from "../components/Slider";

const HomePage = () => {
  const navigate = useNavigate()
  const img1 =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const img2 =
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80";
  return (
    <Layout>
      <div className="container mt-3">
        <Slider/>
        <div className="row">
          <h1>Caterory</h1>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={img1} alt="Rent" style={{ width: "100%" }} />
              <button className="btn"
              onClick={() => navigate("/category/rent")}
              >
                TO RENT
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={img2} alt="Rent" style={{ width: "100%" }} />
              <button 
              className="btn"
              onClick={() => navigate("/category/sale")}
              >
                TO SALE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
