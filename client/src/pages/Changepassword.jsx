import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Styled from "./../style/Style.js";

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
        toast.success(data.message);
        localStorage.removeItem('userdata')
        navigate('/')
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>Change Password</Styled.Title>
      <Styled.Form onSubmit={handleChangePassword}>
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
          <Styled.Label htmlFor="oldPassword">Old Password</Styled.Label>
          <Styled.Input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Styled.FormItem>
        <Styled.FormItem>
          <Styled.Label htmlFor="oldPassword">New Password</Styled.Label>
          <Styled.Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Styled.FormItem>
        <Styled.Button type="submit">Change Password</Styled.Button>
      </Styled.Form>
    </Styled.Container>
  );
};


export default Changepassword;
