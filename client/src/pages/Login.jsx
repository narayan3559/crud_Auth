import React, { useState } from "react";
import { useNavigate, Link   } from "react-router-dom";
import { toast } from "react-toastify";
import * as Styled from "./../style/Style.js";


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
      <Styled.Container>
        <Styled.Title>Login</Styled.Title>
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
            <Styled.Label htmlFor="password">Password</Styled.Label>
            <Styled.Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.Button type="submit">Log In</Styled.Button>
        </Styled.Form>
        <Link className="forgot" to={"/forgot"}>
          Forgot password?
        </Link>
      </Styled.Container>
    </>
  );
};


export default Login;
