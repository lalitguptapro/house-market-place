import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebaseconfig";
import { FaEdit,FaArrowAltCircleRight } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { async } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore"
import CreateListing from "./CreateListing";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();
    toast.success("Successfully Logout");
    navigate("/");
    // alert("h")
  };


  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async() => {
   try {
    if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{
            displayName:name
        })
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, { name });
        toast.success("User Updated!");
    }
} catch (error) {
    console.log(error)
    toast('Something Went Wrong')
   }
  };

  return (
    <Layout>
      <div className="container mt-4 d-flex justify-content-between custom">
        <h4 style={{display:"inline-block"}}>Profile Details</h4>
        <button className="btn1" onClick={logoutHandler}>
          Logout
        </button>
      </div>

      <div className="container mt-4 card" style={{ width: "18rem" }}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <p>User Personal Details </p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? (
                <MdDoneOutline color="green" />
              ) : (
                <FaEdit color="red" />
              )}
            </span>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={onChange}
                disabled={!changeDetails}
              />
              <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={onChange}
                disabled={!changeDetails}
              />
            </div>
            </div>
          </form>
          </div>   
          <div className="container mt-4 w-50 d-flex justify-content-between">

          </div>
          
      </div>
      <Link to="/create-listing" component={CreateListing}>
          <FaArrowAltCircleRight color="primary"/> Sell or Rent Your Home
          </Link>
    </Layout>
  );
};

export default Profile;
