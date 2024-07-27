(function() {

  const lat = 13.3424296;
  const lng = -88.4408013;
  const map = L.map('map').setView([lat, lng ], 16);
  let marker

  // Using Provider ang geocoder

  const geocoderService = L.esri.Geocoding.geocodeService()

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add marker
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  })
  .addTo(map)

  // Check moving marker
  marker.on('moveend', function(event){
    marker = event.target
    const position = marker.getLatLng()
    map.panTo(new L.latLng(position.lat, position.lng))

    //Get street name
    geocoderService.reverse().latlng(position, 13).run(function(error, result){
      marker.bindPopup(result.address.LongLabel).openPopup()
      document.querySelector('#streetLabel').textContent = result?.address?.Address ?? ''
      document.querySelector('#street').defaultValue = result?.address?.Address ?? ''
      document.querySelector('#lat').defaultValue = result?.latlng?.lat ?? ''
      document.querySelector('#lng').defaultValue = result?.latlng?.lng?? ''
    })
  })

  
})()