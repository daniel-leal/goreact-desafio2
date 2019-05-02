import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  height: auto;

  display: flex;
  flex-direction: column;
  margin: 0px 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const RemoveButton = styled.button`
  margin-bottom: 5px;
  align-self: center;
  height: 35px;
  width: 230px;

  background-color: #d74338;

  border-radius: 3px;
  color: #fff;
  font-weight: bold;

  &:hover {
    background-color: #bb321f;
  }
`;

export const RefreshButton = styled.button`
  margin-top: 15px;
  margin-bottom: 5px;
  align-self: center;
  height: 35px;
  width: 230px;

  background-color: #03c383;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;

  &:hover {
    background-color: #017351;
  }
`;
