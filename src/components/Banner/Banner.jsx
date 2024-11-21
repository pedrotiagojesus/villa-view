// CSS
import "./Banner.css";

// Image
import BannerImg from "./../../assets/img/banner.jpg";

const Banner = ({ title }) => {
    return (
        <div id="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
            <div className="container">
                <h1>{title}</h1>
            </div>
        </div>
    );
};

export default Banner;
