import { useReducer, useEffect, useState } from "react";
import { initialState, reducer } from "./hook";
import Loading from "./loading";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CountryDetails({ inputBackground, textColor }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [item, setItem] = useState();
  const [borderCountries, setBorderCountries] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  const handleData = () => {
    dispatch({ type: "updateLoading", loadingValue: true });
    axios
      .get("/data.json")
      .then((response) => {
        setItem(response.data.filter((v) => v.name === name));
        dispatch({
          type: "updateData",
          dataValue: response.data,
        });
      })
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

  useEffect(() => {
    handleData();
  }, [name]);

  useEffect(() => {
    setBorderCountries([]);
    state.data &&
      item[0].borders &&
      state.data.forEach((v) => {
        if (item[0].borders.indexOf(v.alpha3Code) !== -1) {
          setBorderCountries((prev) => [...prev, v]);
        }
      });
  }, [state.data]);

  return (
    <section
      style={{
        backgroundColor: "inherit",
      }}
      className="second_section"
    >
      <button
        style={{ backgroundColor: inputBackground, color: textColor }}
        className="back_button"
        onClick={() => navigate("/")}
      >
        <i className="fa-solid fa-arrow-left back_arrow"></i> Back
      </button>
      {state.loading && <Loading />}
      {item && (
        <div className="full_details">
          <img
            className="part1"
            style={{ height: "320px" }}
            src={item[0].flags.png}
            alt=""
          />
          <div style={{ height: "auto", color: textColor }} className="part2">
            <p className="full_details_heading">{item[0].name}</p>
            <div className="full_details_part">
              <div>
                <p className="details_text">
                  Native Name: <span>{item[0].nativeName}</span>
                </p>
                <p className="details_text">
                  Population: <span>{item[0].population}</span>
                </p>
                <p className="details_text">
                  Region: <span>{item[0].region}</span>
                </p>
                <p className="details_text">
                  Sub Region: <span>{item[0].subregion}</span>
                </p>
                <p className="details_text">
                  Capital: <span>{item[0].capital}</span>
                </p>
              </div>
              <div>
                <p className="details_text">
                  Top Level Domain: <span>{item[0].topLevelDomain}</span>
                </p>
                <p className="details_text">
                  Currencies:{" "}
                  <span>
                    {item[0].currencies.map((c) => (
                      <span key={c.name}>{c.name}</span>
                    ))}
                  </span>
                </p>
                <p className="details_text">
                  Languages:{" "}
                  <span>
                    {item[0].languages.map((c) => (
                      <span key={c.name}>{c.name}</span>
                    ))}
                  </span>
                </p>
              </div>
            </div>
            {item[0].borders && (
              <div className="borderCountries">
                <p>Border Countries:</p>
                {borderCountries.map((value) => {
                  return (
                    <button
                      key={value.name}
                      style={{
                        backgroundColor: inputBackground,
                        color: textColor,
                      }}
                      className="back_button"
                      onClick={() => {
                        navigate(`/details/${value.name}`);
                        CountryDetails;
                      }}
                    >
                      {value.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
