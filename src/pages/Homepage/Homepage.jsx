import { Splide, SplideSlide } from "@splidejs/react-splide";

// CSS
import "./Homepage.css";

// Image
import MainImage from "./../../assets/main-image.jpg";

// Components
import PropertyItem from "../../components/PropertyItem/PropertyItem";

// Hooks
import usePropertyHighlightData from "../../hooks/usePropertyHighlightData";
import usePropertyNewData from "../../hooks/usePropertyNewData";

const Homepage = () => {
    const slideOption = {
        perPage: 1,
        gap: "1.5rem",
        mediaQuery: "min",
        breakpoints: {
            576: {},
            768: {
                perPage: 2,
            },
            992: {
                perPage: 3,
            },
            1200: {},
            1400: {},
        },
    };

    // Data
    const { propertyHighlightArr } = usePropertyHighlightData();
    const { propertyNewArr } = usePropertyNewData();

    return (
        <>
            <section
                id="section-search"
                style={{ backgroundImage: `url(${MainImage})` }}
            >
                <h1 className="title">Villa View</h1>
            </section>

            {propertyHighlightArr && propertyHighlightArr.length > 0 && (
                <section id="section-highlight">
                    <div className="container">
                        <h2 className="title">Imóveis em destaque</h2>
                        <Splide options={slideOption}>
                            {propertyHighlightArr.map((propertyHighlight) => (
                                <SplideSlide
                                    key={`highlight-${propertyHighlight.id}`}
                                >
                                    <PropertyItem
                                        property={propertyHighlight}
                                    />
                                </SplideSlide>
                            ))}
                        </Splide>
                    </div>
                </section>
            )}

            {propertyNewArr && propertyNewArr.length > 0 && (
                <section id="section-new">
                    <div className="container">
                        <h2 className="title">Adicionados recentemente</h2>
                        <Splide options={slideOption}>
                            {propertyNewArr.map((propertyNew) => (
                                <SplideSlide key={`new-${propertyNew.id}`}>
                                    <PropertyItem property={propertyNew} />
                                </SplideSlide>
                            ))}
                        </Splide>
                    </div>
                </section>
            )}
        </>
    );
};

export default Homepage;
