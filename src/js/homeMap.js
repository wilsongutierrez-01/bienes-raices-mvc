(function () {
  const lat =  13.3424296;
  const lng =  -88.4408013;
  const map = L.map('mapHome').setView([lat, lng ], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

})()