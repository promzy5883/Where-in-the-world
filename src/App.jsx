import { useState } from "react";
import "./App.css";
import UseFetch from "./useFetch";

function App() {
  const { data, loading, error } = UseFetch("/data.json");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Filter By Region");
  const [dist, setDist] = useState(false);
  const [val, setVal] = useState(null);
  const [icon, setIcon] = useState("fa-regular fa-moon");
  const [white, setWhite] = useState("hsl(0, 0%, 100%)");
  const [body, setBody] = useState("hsl(0, 0%, 98%)");
  const [lightInput, setLightInput] = useState("hsl(0, 0%, 52%)");
  const [lightText, setLightText] = useState("hsl(200, 15%, 8%)");
  const [translate, setTranslate] = useState("1px");
  let currency = "";
  let language = "";

  const darken = () => {
    if (icon === "fa-regular fa-moon") {
      setIcon("fa-solid fa-moon");
      setLightText("hsl(0, 0%, 100%)");
      setWhite("hsl(207, 26%, 17%)");
      setBody("hsl(209, 23%, 22%)");
      setLightInput("hsl(0, 0%, 100%)");
      setTranslate("0");
    } else {
      setBody("hsl(0, 0%, 98%)");
      setWhite("hsl(0, 0%, 100%)");
      setIcon("fa-regular fa-moon");
      setLightText("hsl(200, 15%, 8%)");
      setTranslate("1px");
      setLightInput("hsl(0, 0%, 52%)");
    }
  };

  return (
    <main className="App">
      <header style={{ backgroundColor: white }}>
        <h1 style={{ color: lightText }} className="title">
          Where in the world?
        </h1>
        <p style={{ color: lightText }} className="dark_mode" onClick={darken}>
          <i style={{ color: lightText }} className={icon} id="moon"></i>
          Dark Mode
        </p>
      </header>
      {dist === false && (
        <section
          style={{
            backgroundColor: body,
            transform: `translateY(${translate})`,
          }}
          className="first_section"
        >
          <div className="row">
            <div style={{ backgroundColor: white }} className="search_box">
              <i
                style={{ color: lightInput }}
                className="fa-solid fa-magnifying-glass search_icon"
              ></i>
              <input
                style={{ backgroundColor: white, color: lightInput }}
                type="search"
                name="country"
                className="search_input"
                placeholder="Search for a Country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              aria-label="Region"
              style={{ backgroundColor: white, color: lightInput }}
              name="region"
              onChange={(e) => setRegion(e.target.value)}
              onClick={() => setSearch("")}
              className="select"
            >
              <option value="Filter By Region">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div className="countries">
            {loading && <p>Loading...</p>}
            {data &&
              region === "Filter By Region" &&
              search === "" &&
              data.map((value) => {
                return (
                  <div
                    onClick={() => {
                      setDist(true);
                      setVal(value);
                    }}
                    key={data.indexOf(value)}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      height: "300px",
                      backgroundColor: white,
                      color: lightText,
                      cursor: "pointer",
                      boxShadow: "1px 0px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "140px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                      src={value.flags.png}
                      alt=""
                    />
                    <p className="country_name">{value.name}</p>
                    <p className="text">
                      Population:
                      <span>{value.population}</span>
                    </p>
                    <p className="text">
                      Region:
                      <span>{value.region}</span>
                    </p>
                    <p className="text">
                      Capital:
                      <span>{value.capital}</span>
                    </p>
                  </div>
                );
              })}
            {region !== "Filter By Region" &&
              search === "" &&
              data
                .filter((c) => {
                  return c.region === region;
                })
                .map((value) => {
                  return (
                    <div
                      onClick={() => {
                        setDist(true);
                        setVal(value);
                      }}
                      key={data.indexOf(value)}
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        height: "300px",
                        backgroundColor: white,
                        cursor: "pointer",
                        color: lightText,
                        boxShadow: "1px 0px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "140px",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                        src={value.flags.png}
                        alt=""
                      />
                      <p className="country_name">{value.name}</p>
                      <p className="text">
                        Population:
                        <span>{value.population}</span>
                      </p>
                      <p className="text">
                        Region:
                        <span>{value.region}</span>
                      </p>
                      <p className="text">
                        Capital:
                        <span>{value.capital}</span>
                      </p>
                    </div>
                  );
                })}
            {search !== "" &&
              data
                .filter((s) => {
                  return s.name.startsWith(search.toString()) === true;
                })
                .map((value) => {
                  return (
                    <div
                      onClick={() => {
                        setDist(true);
                        setVal(value);
                      }}
                      key={data.indexOf(value)}
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        height: "300px",
                        backgroundColor: white,
                        cursor: "pointer",
                        color: lightText,
                        boxShadow: "1px 0px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "140px",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                        src={value.flags.png}
                        alt=""
                      />
                      <p className="country_name">{value.name}</p>
                      <p className="text">
                        Population:
                        <span>{value.population}</span>
                      </p>
                      <p className="text">
                        Region:
                        <span>{value.region}</span>
                      </p>
                      <p className="text">
                        Capital:
                        <span>{value.capital}</span>
                      </p>
                    </div>
                  );
                })}
          </div>
        </section>
      )}
      {dist === true && (
        <section
          style={{
            backgroundColor: white,
            transform: `translateY(${translate})`,
          }}
          className="second_section"
        >
          <button
            style={{ backgroundColor: white, color: lightText }}
            className="back_button"
            onClick={() => setDist(false)}
          >
            <i className="fa-solid fa-arrow-left back_arrow"></i> Back
          </button>
          <div className="full_details">
            <img
              className="part1"
              style={{ height: "320px" }}
              src={val.flags.png}
              alt=""
            />
            <div
              style={{ height: "320px", color: lightText }}
              className="part2"
            >
              <p className="full_details_heading">{val.name}</p>
              <div className="full_details_part">
                <div>
                  <p className="details_text">
                    Native Name: <span>{val.nativeName}</span>
                  </p>
                  <p className="details_text">
                    Population: <span>{val.population}</span>
                  </p>
                  <p className="details_text">
                    Region: <span>{val.region}</span>
                  </p>
                  <p className="details_text">
                    Sub Region: <span>{val.subregion}</span>
                  </p>
                  <p className="details_text">
                    Capital: <span>{val.capital}</span>
                  </p>
                </div>
                <div>
                  <p className="details_text">
                    Top Level Domain: <span>{val.topLevelDomain}</span>
                  </p>
                  <p className="details_text">
                    {val.currencies.forEach((c) => (currency += " " + c.name))}
                    Currencies: <span>{currency}</span>
                  </p>
                  <p className="details_text">
                    Languages:
                    {val.languages.forEach((n) => (language += " " + n.name))}
                    <span>{language}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <footer>
        <p>
          Challenge by{" "}
          <a href="https://www.frontendmentor.io">Frontend Mentor</a> Coded by{" "}
          <a href="https://promzy.netlify.app">Promise</a>
        </p>
      </footer>
    </main>
  );
}

export default App;
