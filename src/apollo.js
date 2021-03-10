import {makeVar, InMemoryCache, ApolloClient}  from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN,token);
    isLoggedInVar(true);    
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);    
}

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    link:createUploadLink({
        uri:"http://localhost:4000/graphql"
    }),
    cache: new InMemoryCache(),
});