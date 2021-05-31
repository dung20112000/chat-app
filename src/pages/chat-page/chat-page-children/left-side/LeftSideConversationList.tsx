import {Container} from "react-bootstrap";
import ConversationBlockCommon from "../../../../common-components/conversation-block.common";

const LeftSideConversationList = () => {
    return (
        <Container fluid>
            <ConversationBlockCommon friendName="Hoang" lastMessage="dep zai" />
        </Container>
    )
}
export default LeftSideConversationList;