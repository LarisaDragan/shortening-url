import ShortenComponent from "../ShortenComp/ShortenComponent";
import "./Home.css";

const Home = () => {
  return (
    <div id="home">
      <div className="img-container">
        <p>Shorten your links easily!</p>
        <img src="./images/illustration-working.svg" alt="ilustration" />
      </div>

      <div className="shortened-container">
        <ShortenComponent />
      </div>
    </div>
  );
};

export default Home;
