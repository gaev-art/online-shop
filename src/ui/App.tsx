import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { useDispatch } from "react-redux";
import { actions } from "../redux/authReducer";
import { Header } from "./Header/Header";
import { useAppSelector } from "../redux/store";

export const App = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);

  console.log(process.env.REACT_APP_API_BASE_URL);

  useEffect(() => {
    const getUser = () => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log("app :", resObject);
          dispatch(actions.setUser(resObject.user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <Header user={user} />
      <div style={{ textAlign: "center" }}>
        <Routes>
          <Route path="/" element={<h1>first page</h1>} />
          <Route path="/settings" element={<h1>settings</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
