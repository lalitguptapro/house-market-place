import React,{useState,useEffect} from 'react'
import {db} from '../firebaseconfig';
import { collection,getDoc,query,orderBy,limit, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SwipeCore, { EffectCoverflow, Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { async } from '@firebase/util';
import Spinner from './Spinner';

SwipeCore.use([EffectCoverflow, Pagination]);

const Slider = () => {
    const [listings,setListings] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef =collection(db,'listings')
            const q = query(listingsRef,orderBy('timestamp','desc'), limit(5))
            const querySnap = await getDocs(q)
            let listings = []
            querySnap.forEach(doc => {
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                });
            });
            setListings(listings);
            setLoading(false);
        };
        fetchListings();
        console.log(listings === null ? "loading" : listings);
    },[]);
    if(loading){
        return <Spinner/>
    }
  return <>
  
  </>;
 
}

export default Slider