import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  opacity: 0;

  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;

  &.modal {
    z-index: 1000;

    &.--open {
      opacity: 1;
      transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Content = styled.div`
  width: 70%;

  z-index: 2000;
  position: relative;

  .close {
    border: none;
    position: absolute;
    top: -16px;
    right: -16px;

    z-index: 2;
    background: #fff;
    border-radius: 10px;
  }

  section {
    margin: 0 auto;
  }
`;
