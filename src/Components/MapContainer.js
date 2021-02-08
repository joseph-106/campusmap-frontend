/*global kakao*/ 
import React, { useEffect, useRef, useState } from "react";

const MapContainer = () => {
    const [map, setMap] = useState(null);
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
                setMap(createdMap);
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