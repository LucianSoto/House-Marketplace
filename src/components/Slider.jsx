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


const Slider = () => {
  const [images, setImages] = useState(null)

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

        let images = []

        querySnap.forEach((doc) => {
          // console.log(doc.data().imgUrls[0])
          images.push(doc.data().imgUrls[0])
        }) 
        setImages(images)
      } catch(err) {
        console.log('could not get images')
      }
    }


    fetchImgUrls()
  }, [])

  console.log(images)
  return (
    <>
    <Swiper
      style={{height: "23vh"}}
      slidesPerView={1}
      pagination={{clickable: true}}
    >
      
      {images && images.map((url, i) => (
        <SwiperSlide key={i}>
          <div 
            className="swiperSlideDiv"
            style={{background: `url(${url}) center no-repeat`,
            backgroundSize: "cover",}}
          >
          </div>
        </SwiperSlide>
      ))}
    </Swiper> 
    </>
  )
}

export default Slider
