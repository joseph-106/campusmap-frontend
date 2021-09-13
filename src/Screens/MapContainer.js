/*global kakao*/ 
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const SEE_BUILDINGS_QUERY = gql`
    query seeBuildings{
        seeBuildings{
            id,
            name,
            lat,
            lng
        }
    } 
`;

const MapContainer = () => {
    const [mapped, setMapped] = useState(null);
    const {data} = useQuery(SEE_BUILDINGS_QUERY);
   
    useEffect(() => {
        const apiKey= process.env.REACT_APP_KAKAO_API_KEY;
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {  
                let container = document.getElementById('myMap');
                let options = {
                    center: new kakao.maps.LatLng(37.33681269428202,127.26645947242548),
                    level:3
                };
                const createdMap = new kakao.maps.Map(container,options);
                setMapped(createdMap);
                
                data?.seeBuildings?.forEach((el)=>{
                    const content= `<a href="/${el.name}">${el.name}</a>`
                    const createdMarker = new kakao.maps.Marker({
                        map:createdMap,
                        position: new kakao.maps.LatLng(el.lat,el.lng),
                        title: el.name,
                        clickable: true
                    });

                    const createdInfo = new kakao.maps.InfoWindow({
                        content:content,
                        removable: true
                    });

                    kakao.maps.event.addListener(createdMarker,'click',function(){
                        createdInfo.open(createdMap,createdMarker);
                    });
                });
            })
        }
    },[data]);
    return (
        <div id='myMap' 
            style={{ 
                width:'100%',
                height:'100vh', 
                maxWidth:"200vh", 
                display:"flex", 
                justifyContent:"center", 
                alignItems:"center",
                marginTop:"20px",
                marginBottom:"20px",
                borderRadius:"40px"
            }}>
        </div>    
    );
}

export default MapContainer;