import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('userdata', JSON.stringify(data))
        navigate('/')
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
      <Title>Login</Title>
      {error && <ErrorText>{error}</ErrorText>}
      <Form onSubmit={handleSubmit}>
        <FormItem>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <Button type="submit">Log In</Button>
      </Form>
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

export default Login;