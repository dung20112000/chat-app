import {Col, Container, Row} from "react-bootstrap";
import "./scss/chatarea.scss"

import {Switch,Route} from "react-router-dom";
import ChatAreaWelcomePage from "./ChatAreaWelcomPage";
import ChatAreaMain from "./ChatAreaMain";

const ChatAreaChatPage = () => {

    return (
        <Container fluid className="bg-very-light-secondary rounded-1rem chat-area-chat-page">
          <Switch>
              <Route path="/chat-page/conversations" exact render={()=> <ChatAreaWelcomePage/>}/>
              <Route path="/chat-page/conversations/:conversationsId" render={()=> <ChatAreaMain/>}/>
          </Switch>
        </Container>
    )
}
export default ChatAreaChatPage;