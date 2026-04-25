import BookNowSection from "@/modules/main/bookNow/BookNowSection";
import { Helmet } from "react-helmet-async";

const BookNowPage = () => {
  return (
    <div>
        <Helmet>
            <title>Book Now | Tour Plaza</title>
        </Helmet>
      <BookNowSection />
    </div>
  );
};

export default BookNowPage;
