import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Docters from "./pages/Docters";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import { Appointment } from "./components/Appointment";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Toaster />
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Docters />} />
        <Route path="/doctors/:speciality" element={<Docters />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:doctorID" element={<Appointment />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
