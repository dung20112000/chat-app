import {IRoute} from "../@types/routes.d";
import ConversationsChatPage from "../pages/chat-page/chat-page-children/conversations/ConversationsChatPage";
import ContactsChatPage from "../pages/chat-page/chat-page-children/contacts/ContactsChatPage";

const chatPageRoutes:IRoute[] = [
    {
        path:"/chat-page/conversations",
        main: ()=> <ConversationsChatPage/>
    },
    {
        path:"/chat-page/contacts",
        main: ()=> <ContactsChatPage/>
    }
];
export default  chatPageRoutes;