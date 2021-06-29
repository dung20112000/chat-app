import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { RootState } from '../../../../redux/reducers/root.reducer.redux';
import LeftSideChatPage from './left-side/LeftSideChatPage';
import RightSideChatPage from './right-side/RightSideChatPage';
import ChatAreaChatPage from './chat-area/ChatAreaChatPage';
const ConversationsChatPage = () => {
  const userId = useSelector((state: RootState) => {
    return state.userInfos?._id;
  });

  if (!userId) {
    return null;
  }
  return (
    <Container fluid>
      <Row className="pl-5">
        <Col xs={3}>
          <LeftSideChatPage />
        </Col>
        <Col xs={6}>
          <ChatAreaChatPage />
        </Col>
        <Col xs={3}>
          <RightSideChatPage />
        </Col>
      </Row>
    </Container>
  );
};

export default ConversationsChatPage;
