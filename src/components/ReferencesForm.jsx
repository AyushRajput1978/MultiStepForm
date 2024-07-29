import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { ProgressButtons } from "../lib/ReusableButtons";
import CustomToast from "../lib/CustomToast";

const ReferencesForm = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastBody, setToastBody] = useState("");
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [referenceIndex, field] = name.split(".");
    const updatedReferences = formData.witnessData.map((reference, index) => {
      if (index === parseInt(referenceIndex)) {
        return {
          ...reference,
          [field]: value,
        };
      }
      return reference;
    });

    if (field === "phoneNo") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          witnessData: updatedReferences,
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
        witnessData: updatedReferences,
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
        witnessData: updatedReferences,
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

  const handleAddressChange = (e, referenceIndex, addressType) => {
    const { name, value } = e.target;
    const updatedReferences = formData.witnessData.map((reference, index) => {
      if (index === parseInt(referenceIndex)) {
        return {
          ...reference,
          [addressType]: {
            ...reference[addressType],
            [name]: value,
          },
        };
      }
      return reference;
    });
    setFormData({
      ...formData,
      witnessData: updatedReferences,
    });
    if (value.trim() === "") {
      setErrors({
        ...errors,
        [`${referenceIndex}.${addressType}.${name}`]: "This field is required",
      });
    } else {
      setErrors({
        ...errors,
        [`${referenceIndex}.${addressType}.${name}`]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    formData.witnessData.forEach((reference, index) => {
      if (!reference.fullName?.trim())
        newErrors[`${index}.fullName`] = "This field is required";
      if (!reference.relation?.trim())
        newErrors[`${index}.relation`] = "This field is required";
      if (!reference.phoneNo?.trim())
        newErrors[`${index}.phoneNo`] = "This field is required";
      if (reference.phoneNo && reference.phoneNo.length !== 10)
        newErrors[`${index}.phoneNo`] =
          "Phone number must be exactly 10 digits";
      if (!reference.email?.trim())
        newErrors[`${index}.email`] = "This field is required";
      if (
        reference.email &&
        (!reference.email.includes("@") || !reference.email.includes("."))
      )
        newErrors[`${index}.email`] = "Email must contain '@' and '.'";
      if (!reference.currentAddress.street?.trim())
        newErrors[`${index}.currentAddress.street`] = "This field is required";
      if (!reference.currentAddress.locality?.trim())
        newErrors[`${index}.currentAddress.locality`] =
          "This field is required";
      if (!reference.currentAddress.pin?.trim())
        newErrors[`${index}.currentAddress.pin`] = "This field is required";
      if (!reference.currentAddress.state?.trim())
        newErrors[`${index}.currentAddress.state`] = "This field is required";
      if (!reference.currentAddress.district?.trim())
        newErrors[`${index}.currentAddress.district`] =
          "This field is required";
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
      {formData.witnessData.map((reference, index) => (
        <div key={index}>
          <h5>Reference {index + 1}</h5>
          <Row>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`reference${index}FullName`}>
                <Form.Label className="fw-500">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name={`${index}.fullName`}
                  value={reference.fullName}
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
              <Form.Group controlId={`reference${index}Relation`}>
                <Form.Label className="fw-500">Relation</Form.Label>
                <Form.Control
                  type="text"
                  name={`${index}.relation`}
                  value={reference.relation}
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
              <Form.Group controlId={`reference${index}PhoneNo`}>
                <Form.Label className="fw-500">Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  name={`${index}.phoneNo`}
                  value={reference.phoneNo}
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
              <Form.Group controlId={`reference${index}Email`}>
                <Form.Label className="fw-500">Email</Form.Label>
                <Form.Control
                  type="email"
                  name={`${index}.email`}
                  value={reference.email}
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
          <h5 className="mt-3">Current Address</h5>
          <Row>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`reference${index}Street`}>
                <Form.Label className="fw-500">Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={reference.currentAddress.street}
                  onChange={(e) =>
                    handleAddressChange(e, index, "currentAddress")
                  }
                />
                {errors[`${index}.currentAddress.street`] && (
                  <span className="text-danger">
                    {errors[`${index}.currentAddress.street`]}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col md={3} className="mb-1">
              <Form.Group controlId={`reference${index}Locality`}>
                <Form.Label className="fw-500">Locality</Form.Label>
                <Form.Control
                  type="text"
                  name="locality"
                  value={reference.currentAddress.locality}
                  onChange={(e) =>
                    handleAddressChange(e, index, "currentAddress")
                  }
                />
                {errors[`${index}.currentAddress.locality`] && (
                  <span className="text-danger">
                    {errors[`${index}.currentAddress.locality`]}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col md={3} className="mb-1">
              <Form.Group controlId={`reference${index}Pin`}>
                <Form.Label className="fw-500">PIN</Form.Label>
                <Form.Control
                  type="text"
                  name="pin"
                  value={reference.currentAddress.pin}
                  onChange={(e) =>
                    handleAddressChange(e, index, "currentAddress")
                  }
                />
                {errors[`${index}.currentAddress.pin`] && (
                  <span className="text-danger">
                    {errors[`${index}.currentAddress.pin`]}
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`reference${index}State`}>
                <Form.Label className="fw-500">State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={reference.currentAddress.state}
                  onChange={(e) =>
                    handleAddressChange(e, index, "currentAddress")
                  }
                />
                {errors[`${index}.currentAddress.state`] && (
                  <span className="text-danger">
                    {errors[`${index}.currentAddress.state`]}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-1">
              <Form.Group controlId={`reference${index}District`}>
                <Form.Label className="fw-500">District</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={reference.currentAddress.district}
                  onChange={(e) =>
                    handleAddressChange(e, index, "currentAddress")
                  }
                />
                {errors[`${index}.currentAddress.district`] && (
                  <span className="text-danger">
                    {errors[`${index}.currentAddress.district`]}
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

export default ReferencesForm;
