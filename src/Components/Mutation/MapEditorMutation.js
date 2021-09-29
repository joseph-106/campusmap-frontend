import {gql} from "@apollo/client";

export const CREATE_BUILDING_MUTATTION = gql`
    mutation createBuilding($name:String! $lat:String! $lng:String!){
        createBuilding(name:$name lat:$lat lng:$lng){
            ok
            error
        }
    }
`;

export const UPDATE_BUILDING_MUTATION=gql`
    mutation updateBuilding($name:String $lat:String $lng:String){
        updateBuilding(name:$name lat:$lat lng:$lng){
            ok
            error
        }
    }
`;

export const CREATE_FLOOR_MUTATTION = gql`
    mutation createFloor($name:String! $Image:Upload $buildingName:String!){
        createFloor(name:$name Image:$Image buildingName:$buildingName){
            ok
            error
        }
    }
`;

// export const UPDATE_FLOOR_MUTATION=gql`
//     mutation updateFloor()
// `;

// export const CREATE_ROOM_MUTATION=gql``;

// export const UPDATE_ROOM_MUTATION=gql``;

