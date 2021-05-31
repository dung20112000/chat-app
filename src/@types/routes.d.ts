import React from "react";

export interface IRoute {

    path: string;
    exact?: boolean;
    strict?: boolean;
    main: ({ ...props }?: any) => React.ReactNode;

}