import { styled } from 'styled-components';

import silkaSrc from '../assets/silka.jpg';

const BgDiv = styled.main`
    width: 100vw;
    box-sizing: border-box;
    min-height: 100vh;
    background: url(${silkaSrc});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 32px;
`;

export const BgDivCenter = styled.main`
  width: 100vw;
  box-sizing: border-box;
  min-height: 100vh;
  background: url(${silkaSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export default BgDiv;
