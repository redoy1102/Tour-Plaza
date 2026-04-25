import ContactSection from "@/modules/main/contact/ContactSection";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <div>
      <Helmet>
        <title>Contact | Tour Plaza</title>
      </Helmet>
      <ContactSection />
    </div>
  );
};

export default ContactPage;
