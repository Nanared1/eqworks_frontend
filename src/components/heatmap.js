import React, {useEffect, useRef} from 'react';


const GOOGLE_MAP_API_KEY = 'AIzaSyDtxAtICzrgcWE9ntlfGjudzCdNzY7IN5c';
const myLocation = { 
    lat: 43.642567,
    lng: -79.387054
};

const mapStyles = {
    width: 'auto',
    height: '600px',
};

const HeatMap = ({data, poi, show}) => {

    console.log(data)

    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const eqWorks = useRef(null);
    const cnTower = useRef(null);
    const niagara = useRef(null);
    const vancouver = useRef(null);

    const createGoogleMap = () =>
        new window.google.maps.Map(googleMapRef.current, {
            zoom: 3,
            center: {
                lat: myLocation.lat,
                lng: myLocation.lng
            }
        }
    );

    // const createMarker = () =>
    //     new window.google.maps.Marker({
    //         position: {lat: myLocation.lat, lng: myLocation.lng},
    //         map: googleMap.current
    // });

    const createEqWorks = () => new window.google.maps.visualization.HeatmapLayer({
        data: [new window.google.maps.LatLng(poi[0].lat, poi[0].lon)],
        map: googleMap.current,
        radius: parseInt(data[0].toString().substring(0,2))
    });

    const createCnTower = () => new window.google.maps.visualization.HeatmapLayer({
        data: [new window.google.maps.LatLng(poi[1].lat, poi[1].lon)],
        map: googleMap.current,
        radius: parseInt(data[1].toString().substring(0,2))
    });

    const createNiagara = () => new window.google.maps.visualization.HeatmapLayer({
        data: [new window.google.maps.LatLng(poi[2].lat, poi[2].lon)],
        map: googleMap.current,
        radius: parseInt(data[2].toString().substring(0,2))
    });

    const createVancouver = () => new window.google.maps.visualization.HeatmapLayer({
        data: [new window.google.maps.LatLng(poi[3].lat, poi[3].lon)],
        map: googleMap.current,
        radius: parseInt(data[3].toString().substring(0,2))
    });


    
    useEffect(() => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=visualization`
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            googleMap.current = createGoogleMap();
            eqWorks.current = createEqWorks();
            cnTower.current = createCnTower();
            niagara.current = createNiagara();
            vancouver.current = createVancouver();
        })
    });

    return (
        <div
            id="google-map"
            ref={googleMapRef}
            style={mapStyles}
        />
    )

}


export default HeatMap;