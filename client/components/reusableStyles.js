import styled from 'styled-components';

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

const PhotoH1 = H1.extend`
  color: #ffffff;
  padding: 0;
`;

const H3 = styled.h3`
  padding: 5px;
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

module.exports = {
  H1,
  H2,
  H3,
  P,
  PhotoH1,
  PhotoDivider,
  SideBar,
};
