import styled from 'styled-components';
import { Main } from '../../components/Main/styles';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 0 30px;
`;

export const MainHome = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 48px;

  list-style: none;

  li {
    position: relative;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }

    a,
    .link {
      flex: 1;
      padding: 24px;
      min-width: 300px;
      min-height: 75px;

      text-decoration: none;

      button {
        width: 100%;
        flex: 1;
        border: 0;
        outline: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        strong {
          font-size: 16px;
          line-height: 21px;
          color: #737380;
          display: inline-block;
        }
      }
    }
  }
`;
