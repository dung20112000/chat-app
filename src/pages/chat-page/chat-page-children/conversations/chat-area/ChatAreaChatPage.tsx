import {Col, Container, Row} from "react-bootstrap";
import ChatAreaRoomName from "./ChatAreaRoomName";
import "./scss/chatarea.scss"
import ChatAreaInput from "./ChatAreaInput";
import ChatAreaDialog from "./ChatAreaDialog";
import {onServerSendMessage} from "../../../../../server-interaction/socket-handle/socket-chat";
import {useEffect} from "react";
import {IUserInfosReducer} from "../../../../../@types/redux";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/RootReducer.reducer.redux";
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