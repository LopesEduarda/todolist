import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);

  .image {
    font-size: 24px;
    margin-right: 10px;
    cursor: pointer;
    color: #6f42c1; /* roxo Bootstrap */
    transition: color 0.3s;
  }

  .image:hover {
    color: #5a32a3;
  }

  .inputs {
    flex: 1;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    outline: none;
    color: #333;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 0;
  }

  input::placeholder,
  textarea::placeholder {
    color: #999;
  }

  textarea {
    resize: none;
    height: 50px;
  }
`;
