// import { CiLocationOn } from "react-icons/ci"
import { BsSearch } from "react-icons/bs"
import "./Search.css"
import location from "../../assets/zomato/location.jpg"

function Search() {
    return (
        <div id="search-box">
            <div id="location">
                {/* <CiLocationOn id="location-icon" /> */}
                <img id="location-icon" src={location} alt="" />
                <div style={{ color: "grey" }}>Kolkata</div>
            </div>
            <div id="search-item">
                <select name="" id=""></select>
                <div id="vertical-line"></div>
                <BsSearch style={{
                    color: "grey", height: "1.5rem",
                    width: "1.5rem"
                }} />
                <input type="search" name="" id="" placeholder="Search for restaurant, cuisine or a dish" />
            </div>
        </div>
    )
}
export default Search