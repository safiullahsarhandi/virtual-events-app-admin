import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { me } from "./Apis";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import useLocationTitle from "./Hooks/useLocationTitle";
import { userState } from "./Recoil";

export default function PrivateRoutes({ children, title }) {
  useLocationTitle(title);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const { mutate, isLoading } = useMutation(() => me(), {
    retry: false,
    onSuccess: (res) => {
      console.log("res.dataL: ", res.data);
      setUser(res?.data?.admin);
      setLoading(false);
    },
    onError: (err) => {
      navigate("/", { replace: true });
      localStorage.clear();
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    if (!user?._id) {
      mutate();
    } else {
      setLoading(false);
      if (window.location.pathname === "/")
        navigate("/dashboard", { replace: true });
    }
  }, [user?._id]);

  if (isLoading || loading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          marginTop: -56,
        }}
      >
        <img src="images/logo.png" alt="logo" />
      </div>
    );

  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
}
