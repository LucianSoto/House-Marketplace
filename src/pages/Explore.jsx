import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import saleCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* slider */}
        <Slider/>
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img 
              src={rentCategoryImage} 
              alt="rent" 
              className="exploreCategoryImg" 
            />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <img 
              src={saleCategoryImage} 
              alt="sale" 
              className="exploreCategoryImg" />
              <p className="exploreCategoryName">Places for sale</p>
          </Link>
          
        </div>
      </main>
    </div>
  )
}

export default Explore
