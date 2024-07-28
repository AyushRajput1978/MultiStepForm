import React from "react";

// libraries
import { Col, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const CustomToast = ({
  show,
  setShow,
  toastBody,
  delay = 5000,
  success = true,
}) => {
  const handleClose = () => setShow(false);
  return (
    <div aria-live="polite" aria-atomic="true">
      <Toast
        onClose={handleClose}
        show={show}
        delay={delay}
        autohide
        style={{
          position: "fixed",
          top: 70,
          right: 40,
          zIndex: 1000000,
          width: "auto",
        }}
      >
        <Toast.Header>
          <Col>
            {success ? (
              <>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-success me-1"
                />
                <strong className="me-4"> Success</strong>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faBan} className="text-danger me-1" />
                <strong className="me-4"> Failure</strong>
              </>
            )}
            <small>{moment().fromNow()}</small>
          </Col>
        </Toast.Header>
        <Toast.Body style={{ color: "black" }}>{toastBody}</Toast.Body>
      </Toast>
    </div>
  );
};

export default CustomToast;
