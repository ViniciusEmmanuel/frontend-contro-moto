import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
  padding: 70px 0;
`;

export const Section = styled.section`
  position: relative;
  flex: 1;
  margin-top: 64px;
  padding: 36px 64px 48px;

  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  .header {
    flex-basis: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    .return {
      position: absolute;
      top: 32px;
      left: 24px;
    }

    .title {
      font-size: 18px;
      font-weight: 300;
    }
  }

  form {
    width: 700px;
    min-height: 300px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;

    margin: 0 auto;

    input {
      margin-top: 24px;

      &.--upper {
        text-transform: uppercase;
      }

      &::placeholder {
        text-transform: capitalize;
      }
    }

    button[type='submit'] {
      margin-top: 32px;
    }
  }
`;
