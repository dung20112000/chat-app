import {IRoute} from "../@types/routes.d";
import ConversationsChatPage from "../pages/chat-page/chat-page-children/conversations/ConversationsChatPage";

const chatPageRoutes:IRoute[] = [
    {
        path:"/chat-page/conversations",
        main: ()=> <ConversationsChatPage/>
    }
];
export default  chatPageRoutes;