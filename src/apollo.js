import {makeVar, InMemoryCache, ApolloClient}  from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN,token);
    isLoggedInVar(true);    
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE,"enabled");
    darkModeVar(true);
}

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
}

const authLink = setContext((_,{headers}) => {
    return {
        headers: {
            ...headers,
            authorization:localStorage.getItem(TOKEN)
        }
    }
})

export const client = new ApolloClient({
    link:authLink.concat(createUploadLink({
        uri:process.env.NODE_ENV === "production" ? "https://campusmap-backend.herokuapp.com/graphql" : "http://localhost:4000/graphql"
    })),
    cache: new InMemoryCache(),
});