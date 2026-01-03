import { Appointment } from "../components/Appointment.jsx";
import DoctorList from "../components/DocterList.jsx";
import HeaderBanner from "../components/HeaderBanner.jsx";
import { SpecialistsMenu } from "../components/Specialists.jsx";

const Home = () => {
  return (
    <>
        <HeaderBanner />
        <SpecialistsMenu />
        <DoctorList/>
        <Appointment/>
    </>
  );
};

export default Home;
