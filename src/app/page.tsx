import Hero from "./components/Children/Hero";
import IncreasedProduct from "./components/Children/IncreasedProduct";


export default function Home() {
  return (
    <div>
      <Hero />
      <IncreasedProduct />
      <div>আজ দাম কমেছে</div>
      <div>সব পণ্য</div>
    </div>
  );
}
