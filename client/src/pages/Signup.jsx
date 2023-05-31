import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import { toast } from "react-toastify";
import * as Styled from './../style/Style.js'

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
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Styled.Container>
        <Styled.Title>Signup</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.FormItem>
            <Styled.Label htmlFor="email">Email</Styled.Label>
            <Styled.Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.Label htmlFor="name">Name</Styled.Label>
            <Styled.Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.Label htmlFor="username">Username</Styled.Label>
            <Styled.Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.Label htmlFor="password">Password</Styled.Label>
            <Styled.Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.Button type="submit">Sign Up</Styled.Button>
        </Styled.Form>
      </Styled.Container>
    </>
  );
};

export default Signup;
