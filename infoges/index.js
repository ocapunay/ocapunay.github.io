var map;
var marcador;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -6.77137, lng: -79.84088 },
    zoom: 13,
  });

}

function obtenerPosicion(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(mostrarPosicion, manejarErrores);
  } else {
    alert("Su navegador no soporta la geolocalización");
  }
}

function mostrarPosicion(posicion){
  var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;
  console.log("latitud:"+latitud);
  console.log("longitud:"+longitud);
  map.setCenter({lat: latitud, lng: longitud},14);
  if (marcador) {
    marcador.setMap(null);
  }
  marcador = new google.maps.Marker({
    position: {lat: latitud, lng: longitud},
    map: map,
    title: "Mi posición actual"
  });
}

function manejarErrores(error){
  switch(error.code){
    case error.PERMISSION_DENIED:
      alert("El usuario no otorgó permiso para geolocalización");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Posición no disponible");
      break;
    case error.TIMEOUT:
      alert("La solicitud ha caducado");
      break;
    case error.UNKNOW_ERROR:
      alert("Error desconocido");
      break;
  }
}

initMap();

setInterval(obtenerPosicion,5000);