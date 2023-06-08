import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, styled} from "@mui/system";
import {Button, Grid, List, ListItem, TextField, Typography} from "@mui/material";
import {getMessages, sendMessage} from "../actions/messagesActions";

const ChatContainer = styled(Container)`
  display: flex;
  gap: 20px;
  height: 100%;
`;

const UserPanel = styled("div")`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
`;

const DialoguePanel = styled("div")`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;

const DialogueContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
});

const SenderMessage = styled(Typography)({
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    padding: '8px',
    marginBottom: '4px',
});

const ReceiverMessage = styled(Typography)({
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: '8px',
    marginBottom: '4px',
});

const Messages = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const isLoading = useSelector((state) => state.chat.isLoading);

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const users = [...new Set(messages.map((msg) => ({name: msg.name, id: msg._id})))]; // Extract unique sender names

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        dispatch(sendMessage({receiver: selectedUser.id, message}));
        setMessage("");
    };

    return (
        <ChatContainer maxWidth="xl" spacing={4}>
            <UserPanel>
                <Typography variant="h5">Users</Typography>
                <List>
                    {users.map((user) => (
                        <ListItem key={user._id} button onClick={() => handleUserClick(user)}>
                            {user.name}
                        </ListItem>
                    ))}
                </List>
            </UserPanel>
            <DialoguePanel>
                <Typography variant="h5">Dialogue</Typography>
                {selectedUser ? (
                    <div>
                        <Typography variant="h6">{selectedUser.name}</Typography>
                        {/* Render the conversation/messages for the selected user */}
                        <Grid
                            sx={{display: "flex", flexDirection: "column", alignItems: "start"}}
                            container
                        >
                            <DialogueContainer>
                                {messages
                                    .filter((msg) => msg._id === selectedUser.id)
                                    .map((msg) =>
                                        msg.messages.map((message) => (
                                            <React.Fragment key={message._id}>
                                                {message.sender === selectedUser.id ? (
                                                    <ReceiverMessage>{message.message}</ReceiverMessage>
                                                ) : (
                                                    <SenderMessage>{message.message}</SenderMessage>
                                                )}
                                            </React.Fragment>
                                        ))
                                    )}
                            </DialogueContainer>
                            <TextField
                                multiline
                                rows={4}
                                value={message}
                                onChange={handleMessageChange}
                                variant="outlined"
                                placeholder="Type your message..."
                            />
                            <Button variant="contained" color="primary" onClick={handleSendMessage}>
                                Send
                            </Button>
                        </Grid>
                    </div>
                ) : (
                    <Typography>Select a user to start a conversation</Typography>
                )}
            </DialoguePanel>
        </ChatContainer>
    );
};

export default Messages;
