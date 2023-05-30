import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";

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
        toast.success(data.message)
      } else {
        const errorData = await response.json();
        toast.error(errorData.error)
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container>
        <Title>Forgot Password</Title>
        <Comment>{commentText}</Comment>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              required
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingIcon />
              </>
            ) : (
              <ButtonText>Send OTP</ButtonText>
            )}
          </Button>
        </Form>
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

const Comment = styled.div`
  font-size: 16px;
  color: white;
  margin-bottom: 10px;
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

const ButtonText = styled.span`
  margin-right: 1px;
`;

const LoadingIcon = styled(AiOutlineLoading)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Forgot;
