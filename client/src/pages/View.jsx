import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Styled from "./../style/Style.js";


const View = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()

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
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setUserData(null)
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
      setUserData(null)
    }
  };

  const handleDelete = async (deleteUsername) => {
    // e.preventDefault();
    console.log('del',username);
    try {
      const response = await fetch("http://localhost:8000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: deleteUsername }),
      });
      console.log("resp:", response);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, { autoClose: 2000 });
        setError("");
        localStorage.removeItem('userdata')
        navigate('/')
      } else {
        const errorData = response.text();
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
    <Styled.Container>
      <Styled.Title>User Fetch</Styled.Title>
      {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
      <Styled.Form onSubmit={handleFetch}>
        <Styled.FormItem>
          <Styled.Label htmlFor="username">Username</Styled.Label>
          <Styled.Input
            type="text"
            required
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Styled.FormItem>
        <Styled.Button type="submit">Fetch User</Styled.Button>
      </Styled.Form>
      {userData && (
        <Styled.UserList>
          {userData.map((user) => (
            <Styled.UserItem key={user._id}>
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Name:</strong> {user.name}
              <br />
              <Styled.Button onClick={() => handleDelete(user.username)}>
                Delete User
              </Styled.Button>
            </Styled.UserItem>
          ))}
        </Styled.UserList>
      )}
    </Styled.Container>
  );
};


export default View;
