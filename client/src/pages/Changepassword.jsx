import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Changepassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
        toast.success(data.message)
        localStorage.removeItem('userdata')
        navigate('/')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Change Password</Title>
      <Form onSubmit={handleChangePassword}>
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
          <Label htmlFor="oldPassword">Old Password</Label>
          <Input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="oldPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormItem>
        <Button type="submit">Change Password</Button>
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
  font-weight: 600;
  color: white;
  display: inline-flex;
  width: 130px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  opacity: 0.6;
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


export default Changepassword;
