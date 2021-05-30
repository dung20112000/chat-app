import React from "react";
import ChatPage from "../pages/chat-page/ChatPage";
import LoginPage from "../pages/login-page/LoginPage";
interface IRoute {

    path: string;
    exact?: boolean;
    strict?: boolean;
    main: ({ ...props }?: any) => React.ReactNode;

}

const appRoutes: IRoute[] = [
    {

        path: "/authenticate",
        main : ()=> <LoginPage/>

    },
    {
        path: "/chat-page",
        main: () => <ChatPage />
    }
]

export default appRoutes;