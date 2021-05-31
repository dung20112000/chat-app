import React from "react";
import LoginPage from "../pages/login-page/LoginPage";
import ChatPage from "../pages/chat-page/ChatPage";
import {IRoute} from "../@types/routes.d";

const appRoutes: IRoute[] = [
    {

        path: "/authenticate",
        main : ()=> <LoginPage/>

    },
    {
        path: "/chat-page",
        strict: true,
        main: () => <ChatPage />
    }
]

export default appRoutes;