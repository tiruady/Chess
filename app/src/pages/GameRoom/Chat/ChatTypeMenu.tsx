import React from 'react';
import styled from '@emotion/styled';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { TextField, useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  border-top: 1px solid ${props => props.theme.palette.divider};
  display: flex;
`;

const StyledInput = styled(TextField)`
  width: 100%;
  margin: ${props => props.theme.spacing(1)}px;
`;

interface Props {
  sendMessage: (content: string) => void;
}

const ChatTypeMenu: React.FC<Props> = ({ sendMessage }) => {
  const [messageInputValue, setMessageInputValue] = React.useState('');
  const theme = useTheme();

  const handleSetNewMessageValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMessageInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(messageInputValue);
    setMessageInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(messageInputValue);
      setMessageInputValue('');
    }
  };

  return (
    <StyledContainer theme={theme}>
      <StyledInput
        data-testid="chat_message-input"
        onChange={handleSetNewMessageValue}
        onKeyDown={handleKeyDown}
        value={messageInputValue}
        placeholder="Type a message..."
        color="secondary"
        theme={theme}
      />
      <IconButton
        data-testid="chat__send-message-button"
        onClick={handleSendMessage}
        color="primary"
      >
        <SendIcon />
      </IconButton>
    </StyledContainer>
  );
};

export default ChatTypeMenu;
