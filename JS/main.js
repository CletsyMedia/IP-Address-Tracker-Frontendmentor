// at_jqI5Sq4c0gYQqz3DpgvMkJQ4gtGYQ
// https://geo.ipify.org/api/v2/country,city?apiKey=at_jqI5Sq4c0gYQqz3DpgvMkJQ4gtGYQ&ipAddress=8.8.8.8
// const secretApi =  'Enter_Your_Api'
// const corsBypass = 'https://cors-anywhere.herokuapp.com/'
// const apiUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=at_jqI5Sq4c0gYQqz3DpgvMkJQ4gtGYQ&ipAddress=${ip}"
// let currentVersion = "v2";

const form = document.querySelector('form');
const ipInput = document.getElementById('ipInput');
const submitInput = document.getElementById("submitInput");
const ipInfo = document.getElementById('ip-info');
const locationinfo = document.getElementById("location-info");
const timeZone = document.getElementById("timezone-info");
const isp = document.getElementById("isp-info");

// Modal
const modalBox = document.getElementById("modalBox");
const errMsg = document.getElementById("error-msg");
const btn = document.getElementById("close-btn");

const map = L.map('map').setView([0, 0], 13);
const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

L.tileLayer(tileUrl, {
    maxZoom: 18,
    attribution: false,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

const locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [35, 35],
    iconAnchor: [15, 15]
});

const marker = L.marker([0, 0], {icon: locationIcon}).addTo(map);

form.onsubmit=(e)=>{
    e.preventDefault();

    fetch(`https://ipapi.co/${ipInput.value}/json/`)
        .then(res => res.json())
        .then(data => renderResults(data))
        .catch(error => displayError(error));
    
    e.target.reset();
}

fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => renderResults(data))
    .catch(error => displayError(error));


function renderResults(data){
    if(data.error){
        throw(`${data.reason}`);
    }
    ipInfo.textContent = data.ip;
    locationinfo.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
    if(data.utc_offset !== null){
        timeZone.textContent = 'UTC: ' + data.utc_offset.slice(0, 3) + ':' + data.utc_offset.slice(3);
    }
    else{
        timeZone.textContent = data.timezone;
    }
    isp.textContent = data.org;
    map.setView([data.latitude, data.longitude], 13);
    marker.setLatLng([data.latitude, data.longitude]);
    marker.bindPopup(`<b>${data.ip}</b>`).openPopup();
}
function displayError(e){
    errMsg.textContent = e;
    modalBox.showModal();
}
btn.onclick=()=>{
    modalBox.close()
}









// let lon = 0;
// let lat = 0;
// async function  loadApi(){
//     let ip = ipInput.value;
//     return(
//         await fetch(
//                 `https://geo.ipify.org/api/v2/country,city?apiKey=at_jqI5Sq4c0gYQqz3DpgvMkJQ4gtGYQ&ipAddress=${ip}`
//         )
//     ).json();
// }
// submitInput.addEventListener('click', async (e) =>{
//     let data = [];
//     let ipInfo = document.getElementById('ip-info');
//     let locationinfo = document.getElementById("location-info");
//     let timezone = document.getElementById("timezone-info");
//     let isp = document.getElementById("isp-info");
//     e.preventDefault();

//     try{
//         if(!ipInput.value){
//             throw new TypeError("Search input cannot be empty!")
//         }else{
//             data = await loadApi();
//             ipInfo.innerHTML = data.ip;
//             locationinfo.innerHTML =`${data.location.city}, ${data.location.region}, ${data.location.country}`;
//             timezone.innerHTML ="UCT: " + "" + data.location.timezone;
//             isp.innerHTML =data.isp;
//             lon = data.location.lng;
//             lat = data.location.lat;
//             var marker = L.marker([lat, lon], { icon: myIcon }).addTo(map);
// 			marker.bindPopup(`Current IP ${data.ip}`).openPopup();
// 			map.flyTo([lat, lon], 13);

//         }
//     }catch(e){
//         console.log(e)
//         console.log('error')
//     }
// })
// var map = L.map("map").setView([lon, lat], 2);
// var myIcon = L.icon({
// 	iconUrl: "images/icon-location.svg",
// 	iconAnchor: [22, 94],
// 	popupAnchor: [0, -70],
// });
// // add the OpenStreetMap tiles
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// 	maxZoom: 19,
// 	attribution:
// 		'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
// }).addTo(map);

















