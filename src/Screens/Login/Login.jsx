import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login, me } from "../../Apis";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import Checkbox from "../../Components/Elements/Form/Checkbox";
import InputPassword from "../../Components/Elements/Form/InputPassword";
import Error from "../../Components/Elements/Modals/Modal.Error";
import { getToken, setAuthHeader } from "../../Util/authHeader";
import { userState } from "../../Recoil";
import useLocationTitle from "../../Hooks/useLocationTitle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember_me, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation((data) => login(data), {
    retry: false,
    onSuccess: (res) => {
      setAuthHeader(res.data.token);
      window.location.reload();
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  // AFTER LOGIN FLOW
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);

  const { mutate: meMutate } = useMutation(() => me(), {
    retry: false,
    onSuccess: (res) => {
      console.log(res?.data);
      setUser(res?.data?.admin);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      localStorage.clear();
      navigate("/", { replace: true });
      setLoading(false);
    },
  });

  useEffect(() => {
    const Token = getToken();
    if (Token) {
      setLoading(true);
      meMutate();
    } else {
      setLoading(false);
    }
  }, []);

  useLocationTitle("Login");

  if (loading)
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
    <section className="login-bg">
      <div className="container position-relative">
        <div className="login-card">
          <div className="row">
            <div className="col-12 text-center">
              <img src="images/logo.png" alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6  mx-auto">
              <div className="login-right-content">
                <div className>
                  <h3 className="mt-1 login-haeding mb-2">Login</h3>
                  <p className="login-text">Login to your account</p>
                </div>
                <form action="dashboard.php">
                  <label htmlFor className="all-lbl">
                    Email Address<span className="red">*</span>
                  </label>
                  <div className="form-field">
                    <Input
                      type="email"
                      className="site-input"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(email) => setEmail(email)}
                    />
                  </div>
                  <label htmlFor className="all-lbl">
                    Password<span className="red">*</span>
                  </label>
                  <div className="form-field">
                    <InputPassword
                      type="password"
                      placeholder="Enter Password"
                      className="site-input right-icon confirm-input"
                      value={password}
                      onChange={(password) => setPassword(password)}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">
                      <Checkbox
                        label="Remember Me"
                        value={remember_me}
                        onChange={(remember_me) => setRememberMe(remember_me)}
                      />
                    </p>
                    <Link to="/recover" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center mt-3">
                    <Button
                      loading={isLoading}
                      onClick={() => mutate({ email, password, remember_me })}
                      className="site-btn w-100"
                    >
                      Log In
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="images/login-side.png"
                alt="login-side"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
