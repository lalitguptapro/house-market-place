import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { db } from "../firebaseconfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Offers = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        console.log(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch data");
      }
    };

    fetchListing();
  }, []);
  return (
    <Layout>
      <div className="mt-3 container-fluid">
        <h1>Best Offers </h1>
      {loading ?(
            <Spinner/>
          ) :listing && listing.length > 0 ? (
          <>
            <div>
                {listing.map((list) => (
                  <ListingItem listing={list.data} id={list.id} key={list.id} />  
                ))}
            </div>
          </>
          ) : (
            <p>There Are No Current Offers</p>
            )}
      </div>
    </Layout>
  )
}

export default Offers;
