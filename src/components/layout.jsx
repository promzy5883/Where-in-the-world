import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useReducer, useState } from "react";

import AllCountries from "./allCountries";
import CountryDetails from "./countryDetails";
import { initialState, reducer } from "./hook";

export default function Layout() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputBackground, setInputBackground] = useState("hsl(0, 0%, 100%)");
  const [textColor, setTextColor] = useState("hsl(207, 26%, 17%)");

  return (
    <main className="App">
      <header
        style={{
          backgroundColor: `${
            state.bodyColor === "hsl(0, 0%, 98%)"
              ? state.headerBackground
              : "hsl(207, 26%, 17%)"
          }`,
        }}
      >
        <h1
          style={{
            color: `${
              state.bodyColor === "hsl(0, 0%, 98%)"
                ? state.textTheme
                : "hsl(0, 0%, 98%)"
            }`,
          }}
          className="title"
        >
          Where in the world?
        </h1>
        <p
          style={{
            color: `${
              state.bodyColor === "hsl(0, 0%, 98%)"
                ? state.textTheme
                : "hsl(0, 0%, 98%)"
            }`,
          }}
          className="dark_mode"
          onClick={() => {
            dispatch({ type: "toggleBackground" });
            if (inputBackground === "hsl(0, 0%, 100%)") {
              setInputBackground("hsl(207, 26%, 17%)");
              setTextColor("hsl(0, 0%, 100%)");
            } else {
              setInputBackground("hsl(0, 0%, 100%)");
              setTextColor("hsl(207, 26%, 17%)");
            }
          }}
        >
          <i
            style={{
              color: `${
                state.bodyColor === "hsl(0, 0%, 98%)"
                  ? state.textTheme
                  : "hsl(0, 0%, 98%)"
              }`,
            }}
            className={
              state.bodyColor === "hsl(0, 0%, 98%)"
                ? state.themeIcon
                : "fa-regular fa-sun"
            }
            id="moon"
          ></i>
          {state.bodyColor === "hsl(0, 0%, 98%)" ? "Dark" : "Light"}
          Mode
        </p>
      </header>
      <section
        style={{
          backgroundColor: state.bodyColor,
        }}
        className="first_section"
      >
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AllCountries
                  inputBackground={inputBackground}
                  textColor={textColor}
                />
              }
            />
            <Route
              path="/details/:name"
              element={
                <CountryDetails
                  inputBackground={inputBackground}
                  textColor={textColor}
                />
              }
            />
          </Routes>
        </HashRouter>
      </section>
    </main>
  );
}
