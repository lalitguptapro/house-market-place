import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Unable to fetch data");
      }
    };
    getLandlord();
  }, [params.landlordId]);
  return (
    <Layout>
      <div className="d-flex align-items-center flex-column justify-content-center">
        <h3>Contact Details</h3>
        <div>
          {landlord !== "" && (
            <main>
              <h2>Name : {landlord?.name}</h2>
              <form>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    value={message}
                    id="message"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingTextarea">your message</label>
                </div>
                <a
                  href={`mailto:${landlord.email}?suject=${searchParams.get(
                    "listingName"
                  )}&body=${message}`}
                >
                    <button className="mt-2">Send Message</button>
                </a>
              </form>
            </main>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
