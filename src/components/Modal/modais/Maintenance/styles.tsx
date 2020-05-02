import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  flex: 1;

  padding: 36px 64px 48px;

  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  form {
    width: 700px;
    min-height: 300px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;

    margin: 0 auto;

    .content {
      flex: 1 1 40%;
      max-width: 40%;
      height: 80%;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      select,
      input,
      textarea {
        margin: 0px;
      }

      label {
        margin-top: 16px;
        span {
          display: block;
          margin-bottom: 4px;
          color: #3e7cb1;
          font-size: 16px;
          line-height: 19px;
        }
      }
    }

    button[type='submit'] {
      margin-top: 32px;
    }
  }
`;
