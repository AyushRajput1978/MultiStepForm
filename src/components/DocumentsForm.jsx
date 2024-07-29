import React, { useRef, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { ProgressButtons } from "../lib/ReusableButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import "./Document.css";
import CustomToast from "../lib/CustomToast";

const DocumentsForm = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastBody, setToastBody] = useState("");
  const [success, setSuccess] = useState(true);

  const aadharCardFileRef = useRef(null);
  const panCardFileRef = useRef(null);
  const voterIdFileRef = useRef(null);
  const drivingLicenseFileRef = useRef(null);
  const passportFileRef = useRef(null);
  const itrFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [docType, field] = name.split(".");
    setFormData({
      ...formData,
      documentsData: {
        ...formData.documentsData,
        [docType]: {
          ...formData.documentsData[docType],
          [field]: value,
        },
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
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const [docType, field] = name.split(".");
    const file = files[0];

    console.log(
      files,
      "files",
      name,
      "name",
      docType,
      "doctype",
      field,
      "field"
    );

    if (!file) {
      setErrors({
        ...errors,
        [name]: `${name} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        setFormData((prevFormData) => ({
          ...prevFormData,
          documentsData: {
            ...prevFormData.documentsData,
            [docType]: {
              ...prevFormData.documentsData[docType],
              [field]: dataUrl,
            },
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   const [docType, field] = name.split(".");
  //   console.log(
  //     files,
  //     "files",
  //     name,
  //     "name",
  //     docType,
  //     "doctype",
  //     field,
  //     "field"
  //   );
  //   setFormData({
  //     ...formData,
  //     documentsData: {
  //       ...formData.documentsData,
  //       [docType]: {
  //         ...formData.documentsData[docType],
  //         [field]: files[0].name,
  //       },
  //     },
  //   });
  //   if (!files[0]) {
  //     setErrors({
  //       ...errors,
  //       [name]: `${name} is required`,
  //     });
  //   } else {
  //     setErrors({
  //       ...errors,
  //       [name]: "",
  //     });
  //   }
  // };

  const handleFileUpload = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "AadharCard.number",
      "AadharCard.file",
      "PANCard.number",
      "PANCard.file",
      "VoterID.number",
      "VoterID.file",
      "DrivingLicense.number",
      "DrivingLicense.file",
      "Passport.number",
      "Passport.file",
      "ITRNo.number",
      "ITRNo.file",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      const [docType, fieldName] = field.split(".");
      if (fieldName === "file") {
        if (!formData.documentsData[docType][fieldName]) {
          newErrors[field] = `${docType} ${fieldName} is required`;
        }
      } else {
        if (!formData.documentsData[docType][fieldName]?.trim()) {
          newErrors[field] = `${docType} ${fieldName} is required`;
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
      <h3>Personal Details</h3>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="aadharCardNumber">
            <Form.Label className="fw-500">Aadhar Card Number</Form.Label>
            <Form.Control
              type="text"
              name="AadharCard.number"
              value={formData.documentsData.AadharCard.number}
              onChange={handleChange}
            />
            {errors["AadharCard.number"] && (
              <span className="text-danger">{errors["AadharCard.number"]}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="aadharCardFile">
            <Form.Label className="fw-500">Aadhar Card File</Form.Label>
            <Form.Control
              type="file"
              name="AadharCard.file"
              onChange={handleFileChange}
              ref={aadharCardFileRef}
              hidden
            />
            <div
              className="custom-file-upload"
              onClick={() => handleFileUpload(aadharCardFileRef)}
            >
              <span className="overflow-hidden">
                {formData.documentsData.AadharCard?.file ||
                  "Upload Aadhar Card"}
              </span>
              <FontAwesomeIcon icon={faFileUpload} className="text-primary" />
            </div>
            {errors["AadharCard.file"] && (
              <span className="text-danger">{errors["AadharCard.file"]}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="panCardNumber">
            <Form.Label className="fw-500">PAN Card Number</Form.Label>
            <Form.Control
              type="text"
              name="PANCard.number"
              value={formData.documentsData.PANCard.number}
              onChange={handleChange}
            />
            {errors["PANCard.number"] && (
              <span className="text-danger">{errors["PANCard.number"]}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="panCardFile">
            <Form.Label className="fw-500">PAN Card File</Form.Label>
            <Form.Control
              type="file"
              name="PANCard.file"
              onChange={handleFileChange}
              ref={panCardFileRef}
              hidden
            />
            <div
              className="custom-file-upload"
              onClick={() => handleFileUpload(panCardFileRef)}
            >
              <span className="overflow-hidden">
                {formData.documentsData.PANCard?.file || "Upload Pan Card"}
              </span>
              <FontAwesomeIcon icon={faFileUpload} className="text-primary" />
            </div>
            {errors["PANCard.file"] && (
              <span className="text-danger">{errors["PANCard.file"]}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="voterIdNumber">
            <Form.Label className="fw-500">Voter ID Number</Form.Label>
            <Form.Control
              type="text"
              name="VoterID.number"
              value={formData.documentsData.VoterID.number}
              onChange={handleChange}
            />
            {errors["VoterID.number"] && (
              <span className="text-danger">{errors["VoterID.number"]}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="voterIdFile">
            <Form.Label className="fw-500">Voter ID File</Form.Label>
            <Form.Control
              type="file"
              name="VoterID.file"
              onChange={handleFileChange}
              ref={voterIdFileRef}
              hidden
            />
            <div
              className="custom-file-upload"
              onClick={() => handleFileUpload(voterIdFileRef)}
            >
              <span className="overflow-hidden">
                {formData.documentsData.VoterID?.file || "Upload Voter ID"}
              </span>
              <FontAwesomeIcon icon={faFileUpload} className="text-primary" />
            </div>
            {errors["VoterID.file"] && (
              <span className="text-danger">{errors["VoterID.file"]}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="drivingLicenseNumber">
            <Form.Label className="fw-500">Driving License Number</Form.Label>
            <Form.Control
              type="text"
              name="DrivingLicense.number"
              value={formData.documentsData.DrivingLicense.number}
              onChange={handleChange}
            />
            {errors["DrivingLicense.number"] && (
              <span className="text-danger">
                {errors["DrivingLicense.number"]}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="drivingLicenseFile">
            <Form.Label className="fw-500">Driving License File</Form.Label>
            <Form.Control
              type="file"
              name="DrivingLicense.file"
              onChange={handleFileChange}
              ref={drivingLicenseFileRef}
              hidden
            />
            <div
              className="custom-file-upload"
              onClick={() => handleFileUpload(drivingLicenseFileRef)}
            >
              <span className="overflow-hidden">
                {formData.documentsData.DrivingLicense?.file ||
                  "Upload Driving License"}
              </span>
              <FontAwesomeIcon icon={faFileUpload} className="text-primary" />
            </div>
            {errors["DrivingLicense.file"] && (
              <span className="text-danger">
                {errors["DrivingLicense.file"]}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="passportNumber">
            <Form.Label className="fw-500">Passport Number</Form.Label>
            <Form.Control
              type="text"
              name="Passport.number"
              value={formData.documentsData.Passport.number}
              onChange={handleChange}
            />
            {errors["Passport.number"] && (
              <span className="text-danger">{errors["Passport.number"]}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="passportFile">
            <Form.Label className="fw-500">Passport File</Form.Label>
            <Form.Control
              type="file"
              name="Passport.file"
              onChange={handleFileChange}
              ref={passportFileRef}
              hidden
            />
            <div
              className="custom-file-upload"
              onClick={() => handleFileUpload(passportFileRef)}
            >
              <span className="overflow-hidden">
                {formData.documentsData.Passport?.file || "Upload Passport"}
              </span>
              <FontAwesomeIcon icon={faFileUpload} className="text-primary" />
            </div>
            {errors["Passport.file"] && (
              <span className="text-danger">{errors["Passport.file"]}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-1">
          <Form.Group controlId="itrNumber">
            <Form.Label className="fw-500">ITR Number</Form.Label>
            <Form.Control
              type="text"
              name="ITRNo.number"
              value={formData.documentsData.ITRNo.number}
              onChange={handleChange}
            />
            {errors["ITRNo.number"] && (
              <span className="text-danger">{errors["ITRNo.number"]}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6} className="mb-1">
          <Form.Group controlId="itrFile">
            <Form.Label className="fw-500">ITR File</Form.Label>
            <Form.Control
              type="file"
              name="ITRNo.file"
              onChange={handleFileChange}
              ref={itrFileRef}
              hidden
            />
            <div
              className="custom-file-upload"
              onClick={() => handleFileUpload(itrFileRef)}
            >
              <span className="overflow-hidden">
                {formData.documentsData.ITRNo?.file || "Upload ITR"}
              </span>
              <FontAwesomeIcon icon={faFileUpload} className="text-primary" />
            </div>
            {errors["ITRNo.file"] && (
              <span className="text-danger">{errors["ITRNo.file"]}</span>
            )}
          </Form.Group>
        </Col>
      </Row>
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

export default DocumentsForm;
