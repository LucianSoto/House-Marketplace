import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import ShareIcon from '../assets/svg/shareIcon.svg'
import { Wrapper, Status, Map, Marker } from '@googlemaps/react-wrapper'


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

  console.log(listing.geolocation)

  const render = (status: Status) => {
    return <h1>{status}</h1>
  }

  return (
    <main>
      {/* slider */}
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
          <li>{listing.parking === true ? 'Desicgnated Parking' : 'Street Parking'}</li>
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
      <div className="leafletContainer">
        <Wrapper apiKey={`${process.env.REACT_APP_GEOCODE_API_KEY}`} render={render}>
          <Map center={[listing.geolocation.lat, listing.geolocation.lng]} style={{height: '100%', width:'100%'}} >
          </Map>   
        </Wrapper>
      </div>
      </div>
    </main>
  )
}

export default Listing
