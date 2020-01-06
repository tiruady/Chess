import React from 'react';
import Game from './Game/Game.container';
import Chat from './Chat/Chat.container';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import { GameRoomContainerProps } from './GameRoom.container';
import QueueLoader from '../../components/Loader/QueueLoader';
import GameLoader from './GameLoader/GameLoader';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
  }
`;

interface Props extends GameRoomContainerProps {}

const GameRoom: React.FC<Props> = ({ isGameLoading }) => {
  const theme = useTheme();

  if (isGameLoading) {
    return <GameLoader />;
  }

  return (
    <StyledContainer theme={theme}>
      <Game />
      <Chat />
    </StyledContainer>
  );
};

export default GameRoom;
