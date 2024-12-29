import Homecarousel from './Carousel';
import Menu from '../Common/Menu';
import Milestones from './Milestones';
import AboutUs from './AboutUs';
import Footer from '../Common/Footer';

function Home () {
 return (      
  <div className="home-bg-image bg-container">
 <div className="container mt-5">
   <Menu/>
  <Homecarousel/>
  <Milestones/>
  <AboutUs/>
  <Footer/>
</div>
</div>
)}

export default Home;