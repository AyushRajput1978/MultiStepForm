import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { ProgressButtons } from '../lib/ReusableButtons';
import CustomToast from '../lib/CustomToast';

const NomineeForm = ({ formData, setFormData, onNext, onPrevious }) => {
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState("");
    const [success, setSuccess] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [nomineeIndex, field] = name.split('.');
        const updatedNominees = formData.nomineeData.map((nominee, index) => {
            if (index === parseInt(nomineeIndex)) {
                return {
                    ...nominee,
                    [field]: value
                };
            }
            return nominee;
        });
        setFormData({
            ...formData,
            nomineeData: updatedNominees
        });
        if (value.trim() === "") {
            setErrors({
                ...errors,
                [name]: "This field is required"
            });
        } else {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        formData.nomineeData.forEach((nominee, index) => {
            if (!nominee.fullName?.trim()) newErrors[`${index}.fullName`] = "This field is required";
            if (!nominee.relation?.trim()) newErrors[`${index}.relation`] = "This field is required";
            if (!nominee.dob?.trim()) newErrors[`${index}.dob`] = "This field is required";
            if (!nominee.gender?.trim()) newErrors[`${index}.gender`] = "This field is required";
            if (!nominee.phoneNo?.trim()) newErrors[`${index}.phoneNo`] = "This field is required";
            if (!nominee.email?.trim()) newErrors[`${index}.email`] = "This field is required";
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
            {formData.nomineeData.map((nominee, index) => (
                <div key={index}>
                    <h5>Nominee {index + 1}</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId={`nominee${index}FullName`}>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name={`${index}.fullName`} value={nominee.fullName} onChange={handleChange} />
                                {errors[`${index}.fullName`] && <span className="text-danger">{errors[`${index}.fullName`]}</span>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId={`nominee${index}Relation`}>
                                <Form.Label>Relation</Form.Label>
                                <Form.Control type="text" name={`${index}.relation`} value={nominee.relation} onChange={handleChange} />
                                {errors[`${index}.relation`] && <span className="text-danger">{errors[`${index}.relation`]}</span>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId={`nominee${index}Dob`}>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" name={`${index}.dob`} value={nominee.dob} onChange={handleChange} />
                                {errors[`${index}.dob`] && <span className="text-danger">{errors[`${index}.dob`]}</span>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId={`nominee${index}Gender`}>
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" name={`${index}.gender`} value={nominee.gender} onChange={handleChange}>
                                    <option>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                                {errors[`${index}.gender`] && <span className="text-danger">{errors[`${index}.gender`]}</span>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId={`nominee${index}PhoneNo`}>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" name={`${index}.phoneNo`} value={nominee.phoneNo} onChange={handleChange} />
                                {errors[`${index}.phoneNo`] && <span className="text-danger">{errors[`${index}.phoneNo`]}</span>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId={`nominee${index}Email`}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name={`${index}.email`} value={nominee.email} onChange={handleChange} />
                                {errors[`${index}.email`] && <span className="text-danger">{errors[`${index}.email`]}</span>}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            ))}
            <ProgressButtons onPrevious={onPrevious} onNext={handleNext}/>
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
