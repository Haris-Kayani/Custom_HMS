import { AppointmentBanner } from "../components/AppointmentBanner.jsx";
import DoctorList from "../components/DocterList.jsx";
import HeaderBanner from "../components/HeaderBanner.jsx";
import { SpecialistsMenu } from "../components/Specialists.jsx";
import { Footer } from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
        <HeaderBanner />
        <SpecialistsMenu />
        <DoctorList/>
        <AppointmentBanner/>
    </>
  );
};

export default Home;
