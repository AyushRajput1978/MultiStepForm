import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import ImageUploader from "../lib/ImageUploader";
import CustomToast from "../lib/CustomToast";

const PersonalDetailsForm = ({
  formData,
  setFormData,
  onNext,
  image,
  setImage,
}) => {
  const [errors, setErrors] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastBody, setToastBody] = useState("");
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (image) {
      setFormData({
        ...formData,
        customerData: {
          ...formData.customerData,
          avatar: image?.path,
        },
      });
    }
  }, [image]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "phoneNo" || name.endsWith(".pin")) {
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "email") {
      formattedValue = value.trim();
    }

    setFormData({
      ...formData,
      customerData: {
        ...formData.customerData,
        [name]: formattedValue,
      },
    });

    if (formattedValue.trim() === "") {
      setErrors({
        ...errors,
        [name]: `${name} is required`,
      });
    } else {
      if (
        name === "email" &&
        !formattedValue.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ) {
        setErrors({
          ...errors,
          [name]: "Invalid email format",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }
  };

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "pin") {
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({
      ...formData,
      customerData: {
        ...formData.customerData,
        [addressType]: {
          ...formData.customerData[addressType],
          [name]: formattedValue,
        },
      },
    });

    if (formattedValue.trim() === "") {
      setErrors({
        ...errors,
        [`${addressType}.${name}`]: `${name} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [`${addressType}.${name}`]: "",
      });
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "gender",
      "dob",
      "fatherName",
      "motherName",
      "maritalStatus",
      "phoneNo",
      "email",
      "currentAddress.street",
      "currentAddress.locality",
      "currentAddress.pin",
      "currentAddress.state",
      "currentAddress.district",
      "permanentAddress.street",
      "permanentAddress.locality",
      "permanentAddress.pin",
      "permanentAddress.state",
      "permanentAddress.district",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      const [addressType, fieldName] = field.split(".");
      if (fieldName) {
        if (!formData.customerData[addressType][fieldName]) {
          newErrors[field] = `${fieldName} is required`;
        }
      } else {
        if (!formData.customerData[field]) {
          newErrors[field] = `${field} is required`;
        } else if (
          field === "email" &&
          !formData.customerData[field].match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ) {
          newErrors[field] = "Invalid email format";
        }
      }
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
      <Row className="justify-content-center">
        <Col md={4} lg={3} className="d-flex justify-content-center">
          <ImageUploader
            img={image}
            setImg={setImage}
            className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
          />
        </Col>
      </Row>
      <br />
      <Row className="mb-1">
        <Col md={6}>
          <Form.Group controlId="fullName">
            <Form.Label className="fw-500">
              Full Name (As per Aadhar)
            </Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.customerData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="text-danger">{errors.fullName}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={3} className="mb-1">
          <Form.Group controlId="gender">
            <Form.Label className="fw-500">Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.customerData.gender}
              onChange={handleChange}
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
            {errors.gender && (
              <span className="text-danger">{errors.gender}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={3} className="mb-1">
          <Form.Group controlId="dob">
            <Form.Label className="fw-500">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.customerData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="text-danger">{errors.dob}</span>}
          </Form.Group>
        </Col>

        <Col md={6} className="mb-1">
          <Form.Group controlId="fatherName">
            <Form.Label className="fw-500">Father's Name</Form.Label>
            <Form.Control
              type="text"
              name="fatherName"
              value={formData.customerData.fatherName}
              onChange={handleChange}
            />
            {errors.fatherName && (
              <span className="text-danger">{errors.fatherName}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="motherName">
            <Form.Label className="fw-500">Mother's Name</Form.Label>
            <Form.Control
              type="text"
              name="motherName"
              value={formData.customerData.motherName}
              onChange={handleChange}
            />
            {errors.motherName && (
              <span className="text-danger">{errors.motherName}</span>
            )}
          </Form.Group>
        </Col>

        <Col md={6} className="mb-1">
          <Form.Group controlId="maritalStatus">
            <Form.Label className="fw-500">Marital Status</Form.Label>
            <Form.Control
              as="select"
              name="maritalStatus"
              value={formData.customerData.maritalStatus}
              onChange={handleChange}
            >
              <option>Select Marital Status</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="divorced">Divorced</option>
            </Form.Control>
            {errors.maritalStatus && (
              <span className="text-danger">{errors.maritalStatus}</span>
            )}
          </Form.Group>
        </Col>
        {formData.customerData.maritalStatus === "yes" && (
          <Col md={6} className="mb-1">
            <Form.Group controlId="spouseName">
              <Form.Label className="fw-500">Spouse Name</Form.Label>
              <Form.Control
                type="text"
                name="spouseName"
                value={formData.customerData.spouseName}
                onChange={handleChange}
              />
              {/* {errors.spouseName && (
                <span className="text-danger">{errors.spouseName}</span>
              )} */}
            </Form.Group>
          </Col>
        )}

        <Col md={6} className="mb-1">
          <Form.Group controlId="phoneNo">
            <Form.Label className="fw-500">Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={formData.customerData.phoneNo}
              onChange={handleChange}
            />
            {errors.phoneNo && (
              <span className="text-danger">{errors.phoneNo}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="email">
            <Form.Label className="fw-500">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.customerData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <h5 className="mt-3">Current Address</h5>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="currentAddressStreet">
            <Form.Label className="fw-500">Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.customerData.currentAddress.street}
              onChange={(e) => handleAddressChange(e, "currentAddress")}
            />
            {errors["currentAddress.street"] && (
              <span className="text-danger">
                {errors["currentAddress.street"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={3} className="mb-1">
          <Form.Group controlId="currentAddressLocality">
            <Form.Label className="fw-500">Locality</Form.Label>
            <Form.Control
              type="text"
              name="locality"
              value={formData.customerData.currentAddress.locality}
              onChange={(e) => handleAddressChange(e, "currentAddress")}
            />
            {errors["currentAddress.locality"] && (
              <span className="text-danger">
                {errors["currentAddress.locality"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={3} className="mb-1">
          <Form.Group controlId="currentAddressPin">
            <Form.Label className="fw-500">PIN</Form.Label>
            <Form.Control
              type="text"
              name="pin"
              value={formData.customerData.currentAddress.pin}
              onChange={(e) => handleAddressChange(e, "currentAddress")}
            />
            {errors["currentAddress.pin"] && (
              <span className="text-danger">
                {errors["currentAddress.pin"]}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="currentAddressState">
            <Form.Label className="fw-500">State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.customerData.currentAddress.state}
              onChange={(e) => handleAddressChange(e, "currentAddress")}
            />
            {errors["currentAddress.state"] && (
              <span className="text-danger">
                {errors["currentAddress.state"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="currentAddressDistrict">
            <Form.Label className="fw-500">District</Form.Label>
            <Form.Control
              type="text"
              name="district"
              value={formData.customerData.currentAddress.district}
              onChange={(e) => handleAddressChange(e, "currentAddress")}
            />
            {errors["currentAddress.district"] && (
              <span className="text-danger">
                {errors["currentAddress.district"]}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <h5 className="mt-3">Permanent Address</h5>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="permanentAddressStreet">
            <Form.Label className="fw-500">Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.customerData.permanentAddress.street}
              onChange={(e) => handleAddressChange(e, "permanentAddress")}
            />
            {errors["permanentAddress.street"] && (
              <span className="text-danger">
                {errors["permanentAddress.street"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={3} className="mb-1">
          <Form.Group controlId="permanentAddressLocality">
            <Form.Label className="fw-500">Locality</Form.Label>
            <Form.Control
              type="text"
              name="locality"
              value={formData.customerData.permanentAddress.locality}
              onChange={(e) => handleAddressChange(e, "permanentAddress")}
            />
            {errors["permanentAddress.locality"] && (
              <span className="text-danger">
                {errors["permanentAddress.locality"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={3} className="mb-1">
          <Form.Group controlId="permanentAddressPin">
            <Form.Label className="fw-500">PIN</Form.Label>
            <Form.Control
              type="text"
              name="pin"
              value={formData.customerData.permanentAddress.pin}
              onChange={(e) => handleAddressChange(e, "permanentAddress")}
            />
            {errors["permanentAddress.pin"] && (
              <span className="text-danger">
                {errors["permanentAddress.pin"]}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="permanentAddressState">
            <Form.Label className="fw-500">State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.customerData.permanentAddress.state}
              onChange={(e) => handleAddressChange(e, "permanentAddress")}
            />
            {errors["permanentAddress.state"] && (
              <span className="text-danger">
                {errors["permanentAddress.state"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="permanentAddressDistrict">
            <Form.Label className="fw-500">District</Form.Label>
            <Form.Control
              type="text"
              name="district"
              value={formData.customerData.permanentAddress.district}
              onChange={(e) => handleAddressChange(e, "permanentAddress")}
            />
            {errors["permanentAddress.district"] && (
              <span className="text-danger">
                {errors["permanentAddress.district"]}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="mt-4" variant="primary" onClick={handleNext}>
          Next
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

export default PersonalDetailsForm;
