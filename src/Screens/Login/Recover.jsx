import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { recoverPassword, resetPassword, verifyCode } from "../../Apis";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import InputNumber from "../../Components/Elements/Form/InputNumber";
import InputPassword from "../../Components/Elements/Form/InputPassword";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import useLocationTitle from "../../Hooks/useLocationTitle";

export default function Recover() {
  useLocationTitle("Recover Password");
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  // FORGOT PASSWORD JOURNEY APIs
  const { mutate: recoverPasswordMuate, isLoading: recoverLoading } =
    useMutation((data) => recoverPassword(data), {
      retry: false,
      onSuccess: (res) => {
        Success(res?.data?.message);
        setStep(2);
      },
      onError: (err) => Error(err?.response?.data?.message),
    });
  const { mutate: verifyCodeMutate, isLoading: codeLoading } = useMutation(
    (data) => verifyCode(data),
    {
      retry: false,
      onSuccess: (res) => {
        Success(res?.data?.message);
        setStep(3);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );
  const { mutate: resetPasswordMuate, isLoading: resetLoading } = useMutation(
    (data) => resetPassword(data),
    {
      retry: false,
      onSuccess: (res) => {
        Success(res?.data?.message);
        setStep(1);
        setCode("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
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
                  <h3 className="mt-1 login-haeding mb-2">Forgot Password</h3>
                  <p className="login-text">
                    Please enter your email address to receive verification code
                  </p>
                </div>
                <form action="forget-password-2.php">
                  <label htmlFor className="all-lbl">
                    Email Address<span className="red">*</span>
                  </label>
                  {step === 1 && (
                    <div className="form-group mt-3">
                      <label for="" class="fc-white">
                        Email Address<span class="fc-red">*</span>
                      </label>
                      <Input
                        placeholder="Email Address"
                        value={email}
                        onChange={(email) => setEmail(email)}
                        className="site-input"
                      />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="form-group mt-3">
                      <label for="" class="fc-white">
                        Recovery Code<span class="fc-red">*</span>
                      </label>
                      <InputNumber
                        max={4}
                        value={code}
                        onChange={(email) => setCode(email)}
                        placeholder="Enter Code Sent To Your Email"
                        className="site-input"
                      />
                    </div>
                  )}
                  {step === 3 && (
                    <>
                      <div className="form-group mt-3">
                        <label for="" class="fc-white">
                          New Password<span class="fc-red">*</span>
                        </label>
                        <InputPassword
                          placeholder="Enter New Password"
                          value={password}
                          onChange={(password) => setPassword(password)}
                          className="site-input right-icon confirm-input"
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label for="" class="fc-white">
                          Confirm Password
                          <span class="fc-red">*</span>
                        </label>
                        <InputPassword
                          placeholder="Enter Password Again"
                          value={confirm_password}
                          onChange={(password) => setConfirmPassword(password)}
                          className="site-input right-icon confirm-input"
                        />
                      </div>
                    </>
                  )}
                  <div className="text-center mt-3">
                    <Button
                      loading={recoverLoading || codeLoading || resetLoading}
                      className="site-btn w-100"
                      onClick={() => {
                        if (step === 1) recoverPasswordMuate({ email });
                        if (step === 2) verifyCodeMutate({ code, email });
                        if (step === 3)
                          resetPasswordMuate({
                            password,
                            confirm_password,
                            code,
                            email,
                          });
                      }}
                    >
                      {step === 3 ? "UPDATE" : "SEND"}
                    </Button>
                  </div>
                  <div className="mt-3 text-center">
                    <Link to="/" className="back-to-web">
                      Back To Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="images/login-side.png"
                alt="logo-side"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
