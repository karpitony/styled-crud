import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  max-width: 600px;
  margin: 20px auto;
`;

export const Message = styled.p`
  font-size: 16px;
  font-weight: 800;
  color: #555;
  margin-bottom: 8px;
`;

export const CreateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;