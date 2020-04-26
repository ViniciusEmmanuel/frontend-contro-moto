import styled from 'styled-components';
import { Main } from '../../components/Main/styles';

export const MainLogon = styled(Main)`
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

export const SectionForm = styled.section`
  flex: 1 1 40%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .form-logon {
    min-width: 60%;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 32px;
      margin: 32px 0px;
    }

    input {
      margin-bottom: 12px;
    }

    .register {
      margin-top: 28px;

      > svg {
        margin-right: 12px;
      }
    }
  }
`;
