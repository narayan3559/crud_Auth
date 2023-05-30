import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const local = JSON.parse(localStorage.getItem("userdata")).user;
  const auth = JSON.parse(localStorage.getItem("userdata")).auth
  const [username, setUsername] = useState(local.username)
  const [name, setName] = useState(local.name);
  const email = local.email
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, name, auth }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.user);
        localStorage.setItem("userdata", JSON.stringify(data.user));
        toast.success(data.message);
        navigate('/')
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Update User</Title>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          <Label>Email</Label>
          <Input style={{color: "white"}} type="email" value={email} disabled />
        </FormItem>
        <FormItem>
          <Label>Username</Label>
          <Input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Name</Label>
          <Input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormItem>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
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
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
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
  color: white;
  font-weight: 600;
  display: inline-flex;
  width: 130px;
`;

const Input = styled.input`
  padding: 8px;
  opacity: 0.6;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 240px;
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


export default Update;
