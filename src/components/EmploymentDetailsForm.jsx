import React, { useRef, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { ProgressButtons } from '../lib/ReusableButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import CustomToast from '../lib/CustomToast';

const EmploymentDetailsForm = ({ formData, setFormData, onNext, onPrevious }) => {
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState("");
    const [success, setSuccess] = useState(true);

    const salarySlipFileRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            employmentStatusData: {
                ...formData.employmentStatusData,
                [name]: value
            }
        });
        if (value.trim() === "") {
            setErrors({
                ...errors,
                [name]: `${name} is required`
            });
        } else {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
          ...formData,
          employmentStatusData: {
            ...formData.employmentStatusData,
            [name]: files[0],    
          },
        });
        if (!files[0]) {
            setErrors({
                ...errors,
                [name]: `${name} is required`
            });
        } else {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleFileUpload = (ref) => {
        if (ref.current) {
          ref.current.click();
        }
    };

    const validateForm = () => {
        const requiredFields = [
            'type', 'organizationName', 'jobTitle', 'designation', 'joiningDate', 'currentOrLastAnnualSalary', 'salarySlip'
        ];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (field === 'salarySlip') {
                if (!formData.employmentStatusData[field]) {
                    newErrors[field] = `${field} is required`;
                }
            } else {
                if (!formData.employmentStatusData[field]?.trim()) {
                    newErrors[field] = `${field} is required`;
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        onNext();
        // if (validateForm()) {
        //     onNext();
        // } else {
        //     setShowToast(true);
        //     setToastBody("Please fill all required fields.");
        //     setSuccess(false);
        // }
    };

    return (
        <Form>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" name="type" value={formData.employmentStatusData.type} onChange={handleChange}>
                            <option>Select Type</option>
                            <option value="Private">Private</option>
                            <option value="Government">Government</option>
                        </Form.Control>
                        {errors.type && <span className="text-danger">{errors.type}</span>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="organizationName">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control type="text" name="organizationName" value={formData.employmentStatusData.organizationName} onChange={handleChange} />
                        {errors.organizationName && <span className="text-danger">{errors.organizationName}</span>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="jobTitle">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control type="text" name="jobTitle" value={formData.employmentStatusData.jobTitle} onChange={handleChange} />
                        {errors.jobTitle && <span className="text-danger">{errors.jobTitle}</span>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="designation">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control type="text" name="designation" value={formData.employmentStatusData.designation} onChange={handleChange} />
                        {errors.designation && <span className="text-danger">{errors.designation}</span>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="joiningDate">
                        <Form.Label>Joining Date</Form.Label>
                        <Form.Control type="date" name="joiningDate" value={formData.employmentStatusData.joiningDate} onChange={handleChange} />
                        {errors.joiningDate && <span className="text-danger">{errors.joiningDate}</span>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="currentOrLastAnnualSalary">
                        <Form.Label>Current/Last Annual Salary</Form.Label>
                        <Form.Control type="number" name="currentOrLastAnnualSalary" value={formData.employmentStatusData.currentOrLastAnnualSalary} onChange={handleChange} />
                        {errors.currentOrLastAnnualSalary && <span className="text-danger">{errors.currentOrLastAnnualSalary}</span>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="salarySlip">
                        <Form.Label>Salary Slip</Form.Label>
                        <Form.Control type="file" name="salarySlip" onChange={handleFileChange} ref={salarySlipFileRef} hidden />
                        <div className="custom-file-upload" onClick={() => handleFileUpload(salarySlipFileRef)}>
                            <span>{formData.employmentStatusData.salarySlip?.name || "Upload Salary Slip"}</span>
                            <FontAwesomeIcon icon={faFileUpload} className='text-primary' />
                        </div>
                        {errors.salarySlip && <span className="text-danger">{errors.salarySlip}</span>}
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

export default EmploymentDetailsForm;
