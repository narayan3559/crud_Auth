import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message)
        console.log(data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Title>Forgot Password</Title>
        <Comment>A password reset link will be sent to your email</Comment>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <Button type="submit">Send OTP</Button>
        </Form>
      </Container>
    </>
  );
};


const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #aabfc8;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Comment = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
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

export default Forgot;
