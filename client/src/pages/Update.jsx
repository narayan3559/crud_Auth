import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Styled from "./../style/Style.js";

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
    <Styled.Container>
      <Styled.Title>Update</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.FormItem>
          <Styled.Label>Email</Styled.Label>
          <Styled.Input
            style={{ color: "white" }}
            type="email"
            value={email}
            disabled
          />
        </Styled.FormItem>
        <Styled.FormItem>
          <Styled.Label>Username</Styled.Label>
          <Styled.Input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Styled.FormItem>
        <Styled.FormItem>
          <Styled.Label>Name</Styled.Label>
          <Styled.Input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Styled.FormItem>
        <Styled.Button type="submit">Update</Styled.Button>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Update;
