import {Container} from "react-bootstrap";
import ConversationBlockCommon from "../../../../../common-components/conversation-block.common";

const LeftSideConversationList = () => {
    return (
        <Container fluid>
            <ConversationBlockCommon active={true} friendName="Hoang" lastMessage="dep zai" />
            <ConversationBlockCommon active={false} friendName="Hoang" lastMessage="dep zai" />
        </Container>
    )
}
export default LeftSideConversationList;