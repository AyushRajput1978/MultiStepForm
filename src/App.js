import React, { useState } from "react";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import DocumentsForm from "./components/DocumentsForm";
import EmploymentDetailsForm from "./components/EmploymentDetailsForm";
import ReferencesForm from "./components/ReferencesForm";
import NomineeForm from "./components/NomineeForm";
import BankDetailsForm from "./components/BankDetailsForm";
import ApiService from "./components/ApiService";
import { Container } from "react-bootstrap";
import MultiStepProgressBar from "./components/MultiStepProgressbar";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    // Customer Data
    customerData: {
      fullName: "",
      gender: "",
      dob: "",
      fatherName: "",
      motherName: "",
      maritalStatus: "",
      spouseName: "",
      phoneNo: "",
      email: "",
      currentAddress: {
        street: "",
        locality: "",
        state: "",
        district: "",
        pin: "",
      },
      permanentAddress: {
        street: "",
        locality: "",
        state: "",
        district: "",
        pin: "",
      },
      avatar: null,
    },

    // Nominee Data
    nomineeData: [
      {
        fullName: "",
        gender: "",
        dob: "",
        relation: "",
        phoneNo: "",
        email: "",
      },
      {
        fullName: "",
        gender: "",
        dob: "",
        relation: "",
        phoneNo: "",
        email: "",
      },
    ],

    // Witness Data
    witnessData: [
      {
        fullName: "",
        relation: "",
        phoneNo: "",
        email: "",
        currentAddress: {
          street: "",
          locality: "",
          state: "",
          district: "",
          pin: "",
        },
      },
    ],

    // Documents Data
    documentsData: {
      AadharCard: {
        number: "",
        file: null,
      },
      PANCard: {
        number: "",
        file: null,
      },
      VoterID: {
        number: "",
        file: null,
      },
      DrivingLicense: {
        number: "",
        file: null,
      },
      Passport: {
        number: "",
        file: null,
      },
      ITRNo: {
        number: "",
        file: null,
      },
    },

    // Employment Status Data
    employmentStatusData: {
      type: "",
      organizationName: "",
      jobTitle: "",
      designation: "",
      joiningDate: "",
      currentOrLastAnnualSalary: "",
      salarySlip: null,
    },

    // Bank Details Data
    bankDetailsData: {
      bankAccountNo: "",
      bankName: "",
      ifscCode: "",
      branchName: "",
      accountHolderName: "",
    },
  });
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log(formData, "form ka data");
    ApiService.registerCustomer(formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
      })
      .catch((error) => {
        console.error("Error registering customer:", error);
      });
  };
  console.log(image, "image");
  return (
    <Container>
      <MultiStepProgressBar currentStep={step} setCurrentStep={setStep} />
      {step === 1 && (
        <PersonalDetailsForm
          image={image}
          setImage={setImage}
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <DocumentsForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 3 && (
        <EmploymentDetailsForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 4 && (
        <ReferencesForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 5 && (
        <NomineeForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {step === 6 && (
        <BankDetailsForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onPrevious={handlePrevious}
        />
      )}
    </Container>
  );
};

export default App;
