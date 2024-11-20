import { useState } from "react";
import District from "../components/Select/District";
import County from "../components/Select/County";
import Parish from "../components/Select/Parish";

const Test = () => {
    console.log("PAGE: Test");

    // District
    const [districtId, setDistrictId] = useState(0);
    const [districtName, setDistrictName] = useState("");
    const handleDistrict = (e) => {
        setDistrictId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setDistrictName(selectedOption.textContent);

        // Reset county data
        setCountyId(0);
        setCountyName("");

        // Reset parish data
        setParishId(0);
        setParishName("");
    };

    // County
    const [countyId, setCountyId] = useState(0);
    const [countyName, setCountyName] = useState("");
    const handleCounty = (e) => {
        setCountyId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setCountyName(selectedOption.textContent);

        // Reset parish data
        setParishId(0);
        setParishName("");
    };

    // Parish
    const [parishId, setParishId] = useState(0);
    const [parishName, setParishName] = useState("");
    const handleParish = (e) => {
        setParishId(Number(e.target.value));

        const selectedOption = e.target.options[e.target.selectedIndex];
        setParishName(selectedOption.textContent);
    };

    return (
        <div>
            <div>
                <District
                    value={districtId}
                    required={true}
                    handleChange={(e) => handleDistrict(e)}
                />
                <input
                    type="hidden"
                    name="district_name"
                    value={districtName}
                />

                <County
                    value={countyId}
                    required={true}
                    handleChange={(e) => handleCounty(e)}
                    districtId={districtId}
                />
                <input type="hidden" name="county_name" value={countyName} />

                <Parish
                    value={parishId}
                    required={false}
                    handleChange={(e) => handleParish(e)}
                    countyId={countyId}
                />
                <input type="hidden" name="parish_name" value={parishName} />
            </div>
        </div>
    );
};

export default Test;
