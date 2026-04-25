import RoomsVillasSection from "@/modules/main/roomsVillas/RoomsVillasSection";
import { Helmet } from "react-helmet-async";

const RoomsVillasPage = () => {
  return (
    <div>
      <Helmet>
        <title>Rooms & Villas | Tour Plaza</title>
      </Helmet>
      <RoomsVillasSection />
    </div>
  );
};

export default RoomsVillasPage;
