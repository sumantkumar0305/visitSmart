import Header from "./AllCode/HeaderCode/Header"
import Footer from "./AllCode/FooterCode/Footer"
import Login from "./AllCode/HeaderCode/LoginCode/Login"
import Signup from "./AllCode/HeaderCode/SignupCode/Signup";
import MainPageCode from "./AllCode/MainBodyCode/MainPageCode";
import AboutCard from "./AllCode/MainBodyCode/AboutCardCode/AboutCard";
import Review from "./AllCode/MainBodyCode/AboutCardCode/ReviewCode/Review";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPageCode/>} />
        <Route path="/login/form" element={<Login/>} />
        <Route path="/signup/form" element={<Signup/>} />
        <Route path="/about/card/in/details" element={<AboutCard rating={0}/>} />
        <Route path="/show/site/review/page" element={<Review/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
