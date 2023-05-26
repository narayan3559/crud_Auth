import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Changepassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()


  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message)
        setErrorMessage("")
        localStorage.removeItem('userdata')
        navigate('/')
      } else {
        setErrorMessage(data.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <Container>
      <Title>Change Password</Title>
      <Form onSubmit={handleChangePassword}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button type="submit">Change Password</Button>
      </Form>
      {successMessage && <SuccessText>{successMessage}</SuccessText>}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e1e1e1;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #4285f4;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  margin-top: 10px;
  color: red;
`;

const SuccessText = styled.p`
  margin-top: 10px;
  color: #1ea44f;
`;


export default Changepassword;
