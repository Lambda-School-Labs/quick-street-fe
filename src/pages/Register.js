import React, { useState } from "react";

//styling
import registration from "../styles/scss/registration.module.scss";
import { RegisterVendor, RegisterAll } from "../components/index";
const Register = (props) => {
  // console.log('Register.js props: ', props);

  const [stepNum, setStepNum] = useState({
    step: 1,
  });
  const [vendorCheck, setVendorCheck] = useState(false);

  const nextStep = () => {
    const { step } = stepNum;
    setStepNum({
      step: step + 1,
    });
  };

  const previousStep = () => {
    const { step } = stepNum;
    setStepNum({
      step: step - 1,
    });
  };

  const userDetails = () => {
    if (stepNum.step === 1) {
      return (
        <RegisterAll
          nextStep={nextStep}
          history={props.history}
          setVendorCheck={setVendorCheck}
        />
      );
    }
  };

  const vendorDetails = () => {
    if (stepNum.step === 2 && vendorCheck) {
      return <RegisterVendor previousStep={previousStep} />;
    }
  };

  return (
    <div className={registration.container} data-testid="register-page">
      {userDetails()}
      {vendorDetails()}
    </div>
  );
};

export default Register;
