import styled from 'styled-components';

const TitleH1 = styled.h1`
  font-family: 'Pacifico', cursive;
  height: 100%;
  padding: 10px;
  color: #1e88e5;
  font-size: 3em;
  text-align: center;
  text-decoration: none;
`;

const H1 = styled.h1`
  font-family: 'Pacifico', cursive;
  height: 100%;
  padding: 10px;
  color: #1e88e5;
  font-size: 3em;
  text-align: center;
  line-height: 4em;
`;

const H2 = styled.h2`
  padding: 10px;
  color: #1e88e5;
  font-size: 1.5em;
  text-align: left;
`;

const AuthH2 = styled.h2`
  padding: 10px;
  color: #1e88e5;
  font-size: 1.5em;
  text-align: center;
  line-height: 3em;
`;

const PhotoH1 = H1.extend`
  color: #ffffff;
  padding: 0;
`;

const H3 = styled.h3`
  padding: 5px;
  margin: 10px 0;
  font-size: 1em;
  text-align: left;
`;

const P = styled.p`
  padding: 5px;
  font-size: .75em;
  text-align: left;
`;

const PhotoDivider = styled.div`
  width: 100%;
  height: 120px;
  margin-top: 20px;
`;

const SideBar = styled.div`
  padding: 30px;
  width: 250px;
  height: 100vh;
  float: left;
`;

const ImagesWrapper = styled.div`
display: flex;
flexWrap: wrap;
justify-content: space-around;
margin: 0px 10px;
`;
const Box = styled.div`
  display: flex;
`;
const InnerBox = styled.div`
  margin: 10px 50px;
`;

module.exports = {
  TitleH1,
  H1,
  H2,
  AuthH2,
  H3,
  P,
  PhotoH1,
  PhotoDivider,
  SideBar,
  ImagesWrapper,
  Box,
  InnerBox,
};
