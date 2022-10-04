import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Slider from 'react-slick'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import ShareIcon from '../assets/svg/shareIcon.svg'
// import GoogleMapReact from 'google-map-react'
// import Pin from '../assets/pin.png'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(null)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(()=> {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()) {
        // console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  if(loading) {
    return <Spinner/>
  }

  console.log(listing.imgUrls)

  return (
    <main>
      {/* <Slider slidesToShow={1} slidesToScroll={1} dots={true} >
      {listing.imgUrls.map((url, i) => (
            <div 
              height={200}
              key={i}
              className="swiperSlideDiv" 
            >
              <img style={{height: 200}} src={`${listing.imgUrls[i]}`} alt="" />
            </div>
        ))}
      </Slider> */}

      <Swiper
        style={{height: "33vh"}}
        slidesPerView={1}
        pagination={{clickable: true}}
      >
        {listing.imgUrls.map((url, i) => (
          <SwiperSlide key={i} >
            <div 
              className="swiperSlideDiv" 
              style={{background: `url(${listing.imgUrls[i]}) center no-repeat`, 
              backgroundSize: "cover",}}
            >
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="shareIconDiv" onClick={()=> {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=> {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <img src={ShareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName"> 
          {listing.name} - $
          { listing.offer 
            ? listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
            : listing.regularPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
          }
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
         <p className="ciscountedPrice">
          ${listing.regularPrice - listing.discountedPrice} discount
         </p>
        )}
        <ul className="listingDetaulsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms`
            : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
          </li>
          <li>{listing.parking === true ? 'Designated Parking' : 'Street Parking'}</li>
          <li>{listing.furnished === true ? 'Furnished' : 'Not Furnished'}</li>
        </ul>

        <p className="listingLocaitonTitle">Location</p>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link 
            to={
              `/contact/${listing.useRef}?listingName=${listing.name}`
            } 
            className='primaryButton'>
            Contact LandLord
          </Link>
        )}

      {/* MAP */}
        <div className="leafletContainer" > 
          <MapContainer style={{height: "100%", width: "100%"}}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13} scrollWheelZoom={false}
          >
            <TileLayer 
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
              <Popup
              maxWidth="600"
              removable
              editable
              // source={listing.location}
              open
              autoClose={false}
              >{listing.location}</Popup>
            </Marker>
            
          </MapContainer>
        </div>
      </div>
    </main>
  )
}

export default Listing
