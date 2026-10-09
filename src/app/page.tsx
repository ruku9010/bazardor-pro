import AllProduct from "./components/Children/AllProduct";
import DecreaseProduct from "./components/Children/DecreaseProduct";
import Hero from "./components/Children/Hero";
import IncreasedProduct from "./components/Children/IncreasedProduct";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div>
      <Hero />
      <IncreasedProduct />
      <DecreaseProduct />
      <AllProduct />
    </div>
  );
}
