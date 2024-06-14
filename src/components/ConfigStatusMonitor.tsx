import React from 'react';
import styled from 'styled-components';
import { ConfigStatus } from '../models/ConfigStatus';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

const Circle = styled.div<{ status: ConfigStatus, minstatus: ConfigStatus }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  opacity: ${(props) => (props.status < props.minstatus ? 0 : 1)};
  background-color: ${(props) =>
    props.minstatus === ConfigStatus.CREATED
      ? '#599FC0'
      : props.minstatus === ConfigStatus.WAITING
      ? '#FFA500'
      : props.minstatus === ConfigStatus.BUILDING
      ? '#800080'
      : '#008000'};
`;

const Line = styled.div<{ status: ConfigStatus, minstatus: ConfigStatus }>`
  flex-grow: 1;
  width: 24px;
  opacity: ${(props) => (props.status < props.minstatus ? 0 : 1)};
  height: 4px;
  background-color: #cccccc;
`;

interface ConfigStatusProps {
    status: ConfigStatus;
}

const ConfigStatusMonitor: React.FC<ConfigStatusProps> = ({ status }) => {
  return (
    <Container>
      <CircleContainer>
        <Circle status={status} minstatus={ConfigStatus.WAITING}/>
        <Line status={status} minstatus={ConfigStatus.CREATED}/>
        <Circle status={status} minstatus={ConfigStatus.CREATED}/>
        <Line status={status} minstatus={ConfigStatus.BUILDING}/>
        <Circle status={status} minstatus={ConfigStatus.BUILDING}/>
        <Line status={status} minstatus={ConfigStatus.DONE}/>
        <Circle status={status} minstatus={ConfigStatus.DONE}/>
      </CircleContainer>
    </Container>
  );
};

export default ConfigStatusMonitor;
