import {IMethodUrlObject} from "../../@types/ApiServices";

export const notRequiredTokenApis: IMethodUrlObject[] = [
    {
        url: "/login",
        method: "POST"
    },
    {
        url: "/register",
        method: "POST"
    },
    {
        url:"/validate-token",
        method:"POST"
    }
];

export const noLoadingApis: IMethodUrlObject[] = [
    {
        url: "/users/friends-requests",
        method: "GET"
    }
]