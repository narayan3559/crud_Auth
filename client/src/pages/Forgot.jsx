import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Styled from "./../style/Style.js";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState(
    "A password reset link will be sent to your email"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmail('')
        setCommentText('A Password Reset link Sent. Go to your email to reset.')
        toast.success(data.message, { autoClose: 2000 });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error, { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Styled.Container>
        <Styled.Title>Forgot Password</Styled.Title>
        <Styled.Comment>{commentText}</Styled.Comment>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.FormItem>
            <Styled.Label htmlFor="email">Email</Styled.Label>
            <Styled.Input
              type="email"
              required
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Styled.FormItem>
          <Styled.Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Styled.LoadingIcon />
              </>
            ) : (
              <Styled.ButtonText>Send OTP</Styled.ButtonText>
            )}
          </Styled.Button>
        </Styled.Form>
      </Styled.Container>
    </>
  );
}


export default Forgot;
