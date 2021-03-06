const { makeVar } = require("@apollo/client");

export const  isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);