import React from "react";
import LoginPage from "../pages/login-page/LoginPage";
import ChatPage from "../pages/chat-page/ChatPage";
import {IRoute} from "../@types/routes.d";
import VideoChat from "../pages/video-call/VideoChat";
import VideoAnswer from "../pages/video-call/VideoAnswer";

const appRoutes: IRoute[] = [
    {

        path: "/authenticate",
        main : ()=> <LoginPage/>

    },
    {
        path: "/chat-page",
        strict: true,
        main: () => <ChatPage />
    },
    {
        path: "/video-chat",
        strict:true,
        main: ()=> <VideoChat/>
    },
]

export default appRoutes;