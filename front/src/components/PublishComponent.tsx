import { useStompClient } from 'react-stomp-hooks';

//Publish a message to all the users that have subscribed to /topic/reply and the message will be visible on all the user’s browser.
export const PublishToAllUsersComponent = () => {
    const stompClient = useStompClient();
    console.log('stompClient', stompClient);

    const publishMessage = () => {
        if (stompClient) {
            console.log('publishing message');

            stompClient.publish({ destination: '/app/broadcast', body: 'Hello from React' });
        }
    };

    return <button onClick={publishMessage}>Send message</button>;
};

//Publish a message to the queue that will be visible only on the sending user’s browser instance and not on any other user’s browser.
export const PublishToMeComponent = () => {
    const stompClient = useStompClient();

    const publishMessage = () => {
        if (stompClient) {
            stompClient.publish({ destination: '/app/user-message', body: 'Hello to myself' });
        }
    };
    return <button onClick={publishMessage}> Expect reply for my action </button>;
};

//Send message to some other user
export const PublishToOtherUserComponent = () => {
    const stompClient = useStompClient();
    const userIdToSendMessageTo = 1;

    const publishMessage = () => {
        if (stompClient) {
            stompClient.publish({ destination: '/app/user-message-' + userIdToSendMessageTo, body: 'Hello User' });
        }
    };
    return <button onClick={publishMessage}> Send message to user {userIdToSendMessageTo}</button>;
};
