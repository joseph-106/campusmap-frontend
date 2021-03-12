/*global kakao*/ 
import React, { useEffect, useState } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import styled from "styled-components";

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
    const [marker, setMarker] = useState(null);
    const {data} = useQuery(SEE_BUILDINGS_QUERY);
    console.log(data);
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
                

                // let createdMarker = new kakao.maps.Marker({
                //     position: createdMap.getCenter()
                // });
                // setMarker(createdMarker);
                // createdMarker.setMap(createdMap);

                // kakao.maps.event.addListener(createdMap,'click',function(mouseEvent){
                //     let latlng = mouseEvent.latLng;
                //     createdMarker.setPosition(latlng);

                //     console.log(latlng.getLat());
                //     console.log(latlng.getLng())
                // });

            })
        }
    },[data]);
    return (
         <div id='myMap' style={{ width:'83vw', height:'50vh', display:"flex", justifyContent:"center", alignItems:"center"}}></div>    
    );
}

export default MapContainer;