/*global kakao*/ 
import React, { useEffect, useRef, useState } from "react";
import {markerData} from "../Data/markerData"

const MapContainer = () => {
    const [mapped, setMapped] = useState(null);
    const [marker, setMarker] = useState(null);
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
                
                markerData.forEach((el)=>{
                    new kakao.maps.Marker({
                        map:createdMap,
                        position: new kakao.maps.LatLng(el.lat,el.lng),
                        title: el.title
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
    },[]);
    return (
        <>
        <div id='myMap' style={{width:'1000px', height:'1000px', justifyContent:"center", alignItems:"center"}}></div>
        </>
    );
}

export default MapContainer;