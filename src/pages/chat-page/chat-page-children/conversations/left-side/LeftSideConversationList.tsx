import {Container} from "react-bootstrap";
import {ConversationBlockCommon,ConversationBlockGroup} from "../../../../../common-components/conversation-block.common";

const LeftSideConversationList = () => {
    return (
        <Container fluid>
            <ConversationBlockCommon active={true} friendName="Hoang" lastMessage="dep zai" />
            <ConversationBlockGroup currentUserAvatarUrl={""} groupName={"Huy"} lastMessage={{sender:"Huy",message:"abc"}} members={6}/>
        </Container>
    )
}
export default LeftSideConversationList;