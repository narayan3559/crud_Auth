import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";  
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/login");
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
        <Title>Signup</Title>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormItem>
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  /* margin-top: 20px; */
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
  align-items: center;
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
  border-radius: 4px;
  width: 240px;
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

export default Signup;
