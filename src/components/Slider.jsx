import React, {useEffect, useState, useRef} from 'react'
import { db } from '../firebase.config'
import {
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter
} from 'firebase/firestore'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigate } from 'react-router-dom';


const Slider = () => {
  const [listings, setListings] = useState(null)

  useEffect(()=> {
    const  fetchImgUrls = async () => {
      try{
        const listingsRef = collection(db, 'listings')

        //Create a Query
        const q = query(
          listingsRef,
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        const querySnap = await getDocs(q)

        let listingsArr = []

        querySnap.forEach((doc) => {
          listingsArr.push({
            type: doc.data().type,
            img: doc.data().imgUrls,
            price: doc.data().regularPrice,
            name: doc.data().name,
          })
        }) 
        setListings(listingsArr)
      } catch(err) {
        console.log('could not get images')
      }
    }

    fetchImgUrls()
  }, [])

  if(listings.length === 0) {
    return <></>
  }

  return (
    <>
    <h2>Recommended</h2>
    <Swiper
      style={{height: "25vh"}}
      slidesPerView={1}
      pagination={{clickable: true}}
    >
      {listings && listings.map((l, i) => (
        <SwiperSlide 
          key={i}
          onClick={() => Navigate(`/category/${l.type}/${i}`)}
        >
          <div 
            className="swiperSlideDiv"
            style={{background: `url(${l.img[0]}) center no-repeat`,
            backgroundSize: "cover",}}
          >
            <p className="swiperSlideText">{l.name}</p>
            <p className="swiperSlidePrice">
              ${l.price}
              {l.type === 'rent' &&  ' / Month'}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper> 
    </>
  )
}

export default Slider
