import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Title = styled.h2`
  margin-bottom: 12px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Textarea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  height: 80px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;
