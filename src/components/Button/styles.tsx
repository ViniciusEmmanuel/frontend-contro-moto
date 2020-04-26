import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 16px;

  display: inline-block;

  border: 0;
  border-radius: 8px;
  background: var(--primary);

  font-weight: 700;
  font-size: 18px;
  line-height: 24px;

  text-align: center;
  text-decoration: none;
  color: #fff;

  transition: filter 0.2s;
  :hover {
    filter: brightness(90%);
  }

  svg {
    animation: rotating 2s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
