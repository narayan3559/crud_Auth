import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Styled from "./../style/Style.js";

const Reset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const token = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const response = await fetch(
        `http://localhost:8000/forgot/reset/${token.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
        <Styled.Title>Reset password</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.FormItem>
            <Styled.Label htmlFor="otp">OTP</Styled.Label>
            <Styled.Input
              type="text"
              placeholder="Enter otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.Label htmlFor="newPassword">New Password</Styled.Label>
            <Styled.Input
              type="password"
              placeholder="Enter new password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.Button type="submit">Reset</Styled.Button>
        </Styled.Form>
      </Styled.Container>
    </>
  );
};



export default Reset;
