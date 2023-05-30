import styled from "styled-components";
import { AiOutlineLoading } from "react-icons/ai";

export const Container = styled.div`
  max-width: 400px;
  margin-top: 120px;
  margin-left: 80px;
  padding: 20px;
  background-color: #000000a9;
  border-radius: 8px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FormItem = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: white;
  display: inline-flex;
  width: 130px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  opacity: 0.5;
  border-radius: 4px;
  width: 240px;
`;

export const Button = styled.button`
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

export const ErrorText = styled.p`
  margin-top: 10px;
  color: red;
`;

export const UserList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
`;

export const UserItem = styled.li`
  margin-bottom: 20px;
  color: white;
`;

export const Comment = styled.div`
  font-size: 16px;
  color: white;
  margin-bottom: 10px;
`;

export const ButtonText = styled.span`
  margin-right: 1px;
`;

export const LoadingIcon = styled(AiOutlineLoading)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;