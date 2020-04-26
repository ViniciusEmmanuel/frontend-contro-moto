import styled from 'styled-components';

export const Header = styled.header`
  height: 64px;

  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;

  background-color: var(--primary);

  .content {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0px auto;

    span {
      font-size: 20px;
      color: #ffff;
      text-transform: uppercase;
      strong {
        text-transform: none;
      }
    }

    .btn-icon {
      width: 60px;
      height: 70%;
      margin-left: 16px;

      background: transparent;
      border-radius: 4px;
      border: 1px solid #dcdce6;
      transition: border-color 0.2s;

      transition: filter 0.2s;
      :hover {
        filter: brightness(180%);
      }
    }
  }
`;
