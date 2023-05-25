import "../App.css";
import axios from "axios";
import { useReducer, useEffect } from "react";
import Loading from "./loading";
import { reducer } from "./hook";
import { initialState } from "./hook";
import { useNavigate } from "react-router-dom";

export default function AllCountries({ inputBackground, textColor }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleData = (callBack) => {
    dispatch({ type: "updateLoading", loadingValue: true });
    axios
      .get("/data.json")
      .then((response) =>
        dispatch({
          type: "updateData",
          dataValue: callBack ? response.data.filter(callBack) : response.data,
        })
      )
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "updateError",
          errorValue:
            "Error Loading Page, Please check your internet connection",
        });
      })
      .finally(() => dispatch({ type: "updateLoading", loadingValue: false }));
  };

  const handleSearch = (e) => {
    dispatch({ type: "changedSearchInput", value: e.target.value });

    if (state.region !== "All Countries") {
      handleData((item) => {
        return (
          item.region === state.region &&
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
    } else {
      handleData((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
    }
  };

  const handleRegion = (e) => {
    dispatch({ type: "changedRegion", value: e.target.value });
    e.target.value !== "All Countries"
      ? handleData((item) => {
          return item.region === e.target.value;
        })
      : handleData();
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <div className="row">
        <div
          style={{
            backgroundColor: `${inputBackground}`,
          }}
          className="search_box"
        >
          <i
            style={{
              color: `${textColor}`,
            }}
            className="fa-solid fa-magnifying-glass search_icon"
          ></i>
          <input
            style={{
              backgroundColor: `${inputBackground}`,
              color: `${textColor}`,
            }}
            type="search"
            name="country"
            className="search_input"
            placeholder="Search for a Country..."
            value={state.search}
            onChange={handleSearch}
          />
        </div>
        <select
          aria-label="Region"
          style={{
            backgroundColor: `${inputBackground}`,
            color: `${textColor}`,
          }}
          value={state.region}
          name="region"
          className="select"
          onChange={handleRegion}
        >
          <option value="All Countries">All Countries</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      {state.loading && <Loading />}
      <div className="countries">
        {state.data &&
          state.data.map((value) => {
            return (
              <div
                key={value.name}
                onClick={() => navigate(`/details/${value.name}`)}
                className="countries-section"
                style={{
                  backgroundColor: state.headerBackground,
                  color: state.textTheme,
                }}
              >
                <img
                  className="countries-images"
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
      {state.data && state.data.length === 0 && (
        <div className="feedBack">
          <p
            style={{
              color: `${
                state.bodyColor === "hsl(0, 0%, 98%)"
                  ? state.textTheme
                  : "hsl(0, 0%, 98%)"
              }`,
            }}
          >
            No Country Found
          </p>
        </div>
      )}
    </>
  );
}
