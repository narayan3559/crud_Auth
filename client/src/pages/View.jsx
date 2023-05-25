import React, { useState, useEffect } from "react";
import styled from "styled-components";

const View = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      console.log("resp:",response)
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    setUserData(null);
    setError("");
  }, [username]);

  return (
    <Container>
      <Title>User Fetch</Title>
      {error && <ErrorText>{error}</ErrorText>}
      <Form onSubmit={handleFetch}>
        <FormItem>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormItem>
        <Button type="submit">Fetch User</Button>
      </Form>
      {userData && (
        <UserList>
          {userData.map((user) => (
            <UserItem key={user._id}>
              <strong>Username:</strong> {user.username}
              <br />
              <strong>Email:</strong> {user.email}
              {/* Add other user data fields as needed */}
            </UserItem>
          ))}
        </UserList>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e1e1e1;
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
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  width: 100px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const ErrorText = styled.p`
  margin-top: 10px;
  color: red;
`;

const UserList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin-bottom: 10px;
`;

export default View;
