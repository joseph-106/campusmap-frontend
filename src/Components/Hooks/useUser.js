import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "apollo";
import { useEffect } from "react";

const ME_QUERY = gql`
    query me{
        me {
            id,
            name,
            studentId,
            idCard,
            major,
            isManaged
        }
    }
`;

const useUser = () => {
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data} = useQuery(ME_QUERY,{
        skip: !hasToken
    });
    useEffect(() =>{
        if(data?.me === null){
            logUserOut();
        }
    },[data]);
    return {data} ;
}

export default useUser;