import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { ProgressButtons } from "../lib/ReusableButtons";
import CustomToast from "../lib/CustomToast";

const NomineeForm = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastBody, setToastBody] = useState("");
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [nomineeIndex, field] = name.split(".");
    const updatedNominees = formData.nomineeData.map((nominee, index) => {
      if (index === parseInt(nomineeIndex)) {
        return {
          ...nominee,
          [field]: value,
        };
      }
      return nominee;
    });

    if (field === "phoneNo") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          nomineeData: updatedNominees,
        });
        if (numericValue.trim() === "") {
          setErrors({
            ...errors,
            [name]: "This field is required",
          });
        } else if (numericValue.length !== 10) {
          setErrors({
            ...errors,
            [name]: "Phone number must be exactly 10 digits",
          });
        } else {
          setErrors({
            ...errors,
            [name]: "",
          });
        }
      }
    } else if (field === "email") {
      setFormData({
        ...formData,
        nomineeData: updatedNominees,
      });
      if (value.trim() === "") {
        setErrors({
          ...errors,
          [name]: "This field is required",
        });
      } else if (!value.includes("@") || !value.includes(".")) {
        setErrors({
          ...errors,
          [name]: "Email must contain '@' and '.'",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        nomineeData: updatedNominees,
      });
      if (value.trim() === "") {
        setErrors({
          ...errors,
          [name]: "This field is required",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    formData.nomineeData.forEach((nominee, index) => {
      if (!nominee.fullName?.trim())
        newErrors[`${index}.fullName`] = "This field is required";
      if (!nominee.relation?.trim())
        newErrors[`${index}.relation`] = "This field is required";
      if (!nominee.dob?.trim())
        newErrors[`${index}.dob`] = "This field is required";
      if (!nominee.gender?.trim())
        newErrors[`${index}.gender`] = "This field is required";
      if (!nominee.phoneNo?.trim())
        newErrors[`${index}.phoneNo`] = "This field is required";
      if (nominee.phoneNo && nominee.phoneNo.length !== 10)
        newErrors[`${index}.phoneNo`] =
          "Phone number must be exactly 10 digits";
      if (!nominee.email?.trim())
        newErrors[`${index}.email`] = "This field is required";
      if (
        nominee.email &&
        (!nominee.email.includes("@") || !nominee.email.includes("."))
      )
        newErrors[`${index}.email`] = "Email must contain '@' and '.'";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    } else {
      setShowToast(true);
      setToastBody("Please fill all required fields.");
      setSuccess(false);
    }
  };

  return (
    <Form className="my-5">
      {formData.nomineeData.map((nominee, index) => (
        <div key={index}>
          <h5 className="mt-3">Nominee {index + 1}</h5>
          <Row>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`nominee${index}FullName`}>
                <Form.Label className="fw-500">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name={`${index}.fullName`}
                  value={nominee.fullName}
                  onChange={handleChange}
                />
                {errors[`${index}.fullName`] && (
                  <span className="text-danger">
                    {errors[`${index}.fullName`]}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`nominee${index}Relation`}>
                <Form.Label className="fw-500">Relation</Form.Label>
                <Form.Control
                  type="text"
                  name={`${index}.relation`}
                  value={nominee.relation}
                  onChange={handleChange}
                />
                {errors[`${index}.relation`] && (
                  <span className="text-danger">
                    {errors[`${index}.relation`]}
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`nominee${index}Dob`}>
                <Form.Label className="fw-500">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name={`${index}.dob`}
                  value={nominee.dob}
                  onChange={handleChange}
                />
                {errors[`${index}.dob`] && (
                  <span className="text-danger">{errors[`${index}.dob`]}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`nominee${index}Gender`}>
                <Form.Label className="fw-500">Gender</Form.Label>
                <Form.Control
                  as="select"
                  name={`${index}.gender`}
                  value={nominee.gender}
                  onChange={handleChange}
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
                {errors[`${index}.gender`] && (
                  <span className="text-danger">
                    {errors[`${index}.gender`]}
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`nominee${index}PhoneNo`}>
                <Form.Label className="fw-500">Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  name={`${index}.phoneNo`}
                  value={nominee.phoneNo}
                  onChange={handleChange}
                />
                {errors[`${index}.phoneNo`] && (
                  <span className="text-danger">
                    {errors[`${index}.phoneNo`]}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`nominee${index}Email`}>
                <Form.Label className="fw-500">Email</Form.Label>
                <Form.Control
                  type="email"
                  name={`${index}.email`}
                  value={nominee.email}
                  onChange={handleChange}
                />
                {errors[`${index}.email`] && (
                  <span className="text-danger">
                    {errors[`${index}.email`]}
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>
      ))}
      <ProgressButtons onPrevious={onPrevious} onNext={handleNext} />
      <CustomToast
        show={showToast}
        toastBody={toastBody}
        setShow={setShowToast}
        success={success}
      />
    </Form>
  );
};

export default NomineeForm;
