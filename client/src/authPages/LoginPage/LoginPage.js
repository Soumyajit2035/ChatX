import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import { validateLoginForm } from "../../shared/utils/validators";
import {useDispatch} from "react-redux";
import {login} from "../../store/slices/authSlice";
import {useNavigate} from "react-router-dom";
// import { getActions } from "../../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const [mail, setMail] = useState ("damon@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userDetails = {
      mail,
      password,
    };
    try {
      const data = await dispatch(login(userDetails));
      if (data.payload) {
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid email or password.");
        alert("Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};



export default LoginPage;
