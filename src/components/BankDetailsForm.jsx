import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import CustomToast from "../lib/CustomToast";

const BankDetailsForm = ({ formData, setFormData, onSubmit, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastBody, setToastBody] = useState("");
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      bankDetailsData: {
        ...formData.bankDetailsData,
        [name]: value,
      },
    });
    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: `${name} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "bankAccountNo",
      "bankName",
      "ifscCode",
      "branchName",
      "accountHolderName",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData.bankDetailsData[field]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    } else {
      setShowToast(true);
      setToastBody("Please fill all required fields.");
      setSuccess(false);
    }
  };

  return (
    <Form className="my-5">
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="bankAccountNo">
            <Form.Label className="fw-500">Bank Account Number</Form.Label>
            <Form.Control
              type="text"
              name="bankAccountNo"
              value={formData.bankDetailsData.bankAccountNo}
              onChange={handleChange}
            />
            {errors.bankAccountNo && (
              <span className="text-danger">{errors.bankAccountNo}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="bankName">
            <Form.Label className="fw-500">Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="bankName"
              value={formData.bankDetailsData.bankName}
              onChange={handleChange}
            />
            {errors.bankName && (
              <span className="text-danger">{errors.bankName}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="ifscCode">
            <Form.Label className="fw-500">IFSC Code</Form.Label>
            <Form.Control
              type="text"
              name="ifscCode"
              value={formData.bankDetailsData.ifscCode}
              onChange={handleChange}
            />
            {errors.ifscCode && (
              <span className="text-danger">{errors.ifscCode}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="branchName">
            <Form.Label className="fw-500">Branch Name</Form.Label>
            <Form.Control
              type="text"
              name="branchName"
              value={formData.bankDetailsData.branchName}
              onChange={handleChange}
            />
            {errors.branchName && (
              <span className="text-danger">{errors.branchName}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="accountHolderName">
            <Form.Label className="fw-500">Account Holder Name</Form.Label>
            <Form.Control
              type="text"
              name="accountHolderName"
              value={formData.bankDetailsData.accountHolderName}
              onChange={handleChange}
            />
            {errors.accountHolderName && (
              <span className="text-danger">{errors.accountHolderName}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex justify-content-end mt-5">
        <Button variant="secondary" className="me-4" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <CustomToast
        show={showToast}
        toastBody={toastBody}
        setShow={setShowToast}
        success={success}
      />
    </Form>
  );
};

export default BankDetailsForm;
