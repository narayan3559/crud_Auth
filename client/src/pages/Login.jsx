import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link   } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        localStorage.setItem('userdata', JSON.stringify(data))
        navigate('/')
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
        <Title>Login</Title>
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
        <Link className="forgot" to={"/forgot"}>Forgot password?</Link>
      </Container>
    </>
  );
};


const Container = styled.div`
  max-width: 400px;
  margin-top: 120px;
  margin-left: 80px;
  padding: 20px;
  background-color: #000000a9;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: white;
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
  color: white;
  font-weight: 600;
  display: inline-flex;
  width: 130px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  opacity: 0.5;
  width: 240px;
  border-radius: 4px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #363636b8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Login;
