import LoginPage from "../pages/login-page/LoginPage";
interface IRoute {
    path:string;
    exact?:boolean;
    strict?:boolean;
    main: ({...props}:any) => React.ReactNode;
}

const appRoutes: IRoute[] = [
    {
        path: "/login",
        main : ()=> <LoginPage/>
    }
]