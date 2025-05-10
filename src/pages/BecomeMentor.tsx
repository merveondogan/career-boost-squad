
import { MentorFormPage } from "@/components/mentor/MentorFormPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BecomeMentor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl">
          <MentorFormPage />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BecomeMentor;
