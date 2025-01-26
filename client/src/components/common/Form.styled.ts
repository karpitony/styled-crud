import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding-top: 6rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600; 
  margin-bottom: 0.5rem;
  color: #555;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4caf50;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4caf50;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const OutlineButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: transparent;
  border: 1px solid #4caf50;
  border-radius: 0.5rem;
  color: #4caf50;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #4caf50;
    color: white;
  }
`;

export const Link = styled.a`
  font-size: 0.9rem;
  color: #4caf50;
  text-align: right;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #45a049;
  }
`;
