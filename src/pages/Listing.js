import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import { async } from "@firebase/util";
import Spinner from "../components/Spinner";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if(loading) {return <Spinner/>}
  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center mt-4">
        <div className="card" style={{ width: "600px" }}>
          <div className="card-body">
            <h3>{listing.name}</h3>
            <h6>
                Price :{" "}
                {listing.offer ? listing.discountPrice : listing.regularPrice} /
                RS
            </h6>
            <p>Property For :{listing.type === "rent" ? "Rent" : "Sale"}</p>
            <p>
                {listing.offer && (
                    <span>
                        {listing.regularPrice - listing.discountPrice} Discount
                    </span>
                )}
            </p>
            <p>
                {listing.bedrooms > 1 
                ? `${listing.bedrooms} Bedrooms` 
                : "Bedrooms"}
            </p>
            <p>{listing.parking ? `Parking spot` : "no spot for parking"}</p>
            <p>{listing.furnished ? `furnished house` : "not furnished"}</p>
            <Link 
                className=""
                to={`/contact/${listing.useRef}?listingName=${listing.name}`}
            >
                Contact Landlord
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
