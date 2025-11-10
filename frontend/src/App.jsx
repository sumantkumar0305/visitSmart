import Header from "./AllCode/HeaderCode/Header"
import Footer from "./AllCode/FooterCode/Footer"
import Login from "./AllCode/HeaderCode/LoginCode/Login"
import Signup from "./AllCode/HeaderCode/SignupCode/Signup";
import MainPageCode from "./AllCode/MainBodyCode/MainPageCode";
import AboutCard from "./AllCode/MainBodyCode/AboutCardCode/AboutCard";
import Review from "./AllCode/MainBodyCode/AboutCardCode/ReviewCode/Review";
import ReviewEdit from "./AllCode/MainBodyCode/AboutCardCode/ReviewCode/ReviewEdit";
import HotelAddForm from "./AllCode/MainBodyCode/AboutCardCode/HotelCode/HotelAddForm";
import {Routes, Route} from "react-router-dom";

function App() {
  const checkUserProfile = async () => {
      const loggedIn = await fetchUserProfile();
    };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPageCode/>} />
        <Route path="/login/form" element={<Login/>} />
        <Route path="/signup/form" element={<Signup/>} />
        <Route path="/about/card/in/details" element={<AboutCard />} />
        <Route path="/show/site/review/page" element={<Review/>} />
        <Route path="/hello" element={<ReviewEdit/>} />
        <Route path="/add/hotel/form" element={<HotelAddForm/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
