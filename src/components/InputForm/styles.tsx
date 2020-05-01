import styled from 'styled-components';

export const InputForm = styled.input`
  width: 100%;
  height: 60px;
  color: #333;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 16px 24px;

  &.error {
    border: 1px solid #a24936;
  }

  + span.error {
    font-size: 12px;
    line-height: 1.2;
    text-transform: capitalize;
    color: #a24936;
  }
`;
