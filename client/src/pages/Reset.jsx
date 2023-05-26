import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const response = await fetch(
        `http://localhost:8000/forgot/reset/${token.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        console.log(data);
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Container>
        <Title>Reset password</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="otp">OTP</Label>
            <Input
              type="text"
              placeholder="Enter otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="text"
              placeholder="Enter new password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormItem>
          <Button type="submit">Reset</Button>
        </Form>
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  width: 130px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  width: 240px;
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

export default Reset;
