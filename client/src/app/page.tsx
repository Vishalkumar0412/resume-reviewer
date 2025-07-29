
import About from "@/components/About";
import Herosection from "@/components/Herosection";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import { store } from "@/lib/store/store";
import { Provider } from "react-redux";

 function Home() {
  return (
    <>

    <Herosection/>
    <About/>
    <Testimonials/>
    <Steps/>
   
     </>
  );
}
export default Home