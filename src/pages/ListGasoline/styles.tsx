import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100%;
  max-width: 1280px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  margin: 0 auto;
  padding: 70px 0px 0px;
`;

export const Section = styled.section`
  width: 95%;
  flex: 1;
  padding: 16px;

  .header {
    margin: 12px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: relative;

    .return {
      position: absolute;
      top: 32px;
      left: -48px;
    }

    button[type='submit'],
    label {
      margin-right: 12px;
      flex-basis: 15%;

      span {
        color: #3e7cb1;
        font-size: 16px;
        line-height: 19px;
      }

      input,
      select {
        margin-top: 4px;
        height: 50px;
      }
    }
    button[type='submit'] {
      margin: unset;
      height: 50px;
      align-self: flex-end;
    }
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;

    th {
      background: #49b6ff;
      filter: brightness(100%);
      color: #ffffff;
    }

    th,
    td {
      border: 1px solid #eaeaea;
      padding: 8px;
      text-align: left;

      &.action {
        text-align: center;
      }
    }

    tr {
      background: #ffffff;

      &:nth-child(even) {
        background: #f9f9f9;
      }
    }

    tbody tr:hover {
      background: #eaeaea;
      filter: brightness(90%);
    }
  }
`;

export const Button = styled.button`
  width: 100%;

  display: inline-block;

  border: 0;
  background: transparent;

  font-weight: 700;

  text-align: center;
  text-decoration: none;
  color: #fff;
`;
