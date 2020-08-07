import React, { useState } from "react";

//styling
import registration from "../styles/scss/registration.module.scss";
import { RegisterVendor, RegisterAll } from "../components/index";
import CustomerForm from "../customer-flow/components/CustomerForm";
const Register = (props) => {

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

  const customerForm = () => {
    if (stepNum.step === 2 && !vendorCheck) {
      return <CustomerForm previousStep={previousStep} nextStep={nextStep} />;
    }
  };

  return (
    <div className={registration.container} data-testid="register-page">
      {userDetails()}
      {vendorDetails()}
      {customerForm()}
    </div>
  );
};

export default Register;
