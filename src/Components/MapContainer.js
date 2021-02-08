import React, { useEffect, useRef, useState } from "react";

const {kakao} = window;

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
                    center: new kakao.maps.LatLng(33.450701,126.570667),
                    level:3
                };
                const createdMap = new kakao.maps.Map(container,options);
                setMap(createdMap);
            })
        }
    },[]);
    return (
        <>
        <div id='myMap' style={{width:'500px', height:'500px'}}></div>
        </>
    );
}

export default MapContainer;