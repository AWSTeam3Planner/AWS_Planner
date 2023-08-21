import React, { useState } from "react";
import UserPool from "../UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import SuccessModal from "./SuccessModal";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 모달 상태 추가
  const attributeData = new CognitoUserAttribute({
    Name: "email",
    Value: email,
  });

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(username, password, [attributeData], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
      setShowSuccessModal(true); // 모달 열기
    });
  };

  return (
    <>
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <form onSubmit={onSubmit}>
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">
                  Annotation T3 Planner Signup
                </h2>
                <p className="text-white-50 mb-5">
                  set your login, password and email!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  label="username"
                  id="formControlLg"
                  type="username"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  label="Email"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />

                <MDBBtn
                  type="submit"
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                >
                  Signup
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <SuccessModal setText={"Please check your email for the verification code to complete signup."} isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
  </>
  );
};

export default Signup;
