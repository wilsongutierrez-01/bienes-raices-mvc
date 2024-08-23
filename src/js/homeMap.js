(function () {
  const lat =  13.3424296;
  const lng =  -88.4408013;
  const map = L.map('mapHome').setView([lat, lng ], 16);

  let markers = new L.FeatureGroup().addTo(map)

  let properties = []

  const filters = {
    category: '',
    price: '',
  }

  const categorySelect = document.querySelector('#categories')
  const priceSelect = document.querySelector('#prices')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  categorySelect.addEventListener('change', e => {
    filters.category = e.target.value
    filterProperties()
  })

  priceSelect.addEventListener('change', e => {
    filters.price = e.target.value
    filterProperties()
  })

  
  const getProperties = async () => {
    try {
      const url = 'api/properties'
      const response = await fetch(url)
      const data = await response.json()
      properties = data.properties
      
      showProperties(properties)
      
    }catch (error) {
      console.log(error)
    }
  }
  
  const showProperties = (properties) => {

    markers.clearLayers()

    properties.forEach(property => {
      const marker = new L.marker([property?.lat, property?.lng], {
        autoPan: true,
      })
      .addTo(map)
      .bindPopup(`
        <p class="text-indigo-600 font-bold">${property?.category.name}</p>
        <h1 class="text-xl font-extrabold uppercase" >${property?.title}</h1>
        <img src="/uploads/${property.image}" alt="Image for ${property.title}">
        <p class="text-gray-600 font-bold">${property?.price.name}</p>
        
        <a class="bg-indigo-600 block p-2 text-center font-bold uppercase " href="/property/${property.id}">Learn more</a>
        `)
        markers.addLayer(marker)
      })
    }

    const filterProperties = () => {
      const result = properties.filter(property => {
        return filters.category ? property.categoryId.toString() === filters.category.toString() : property 
      })
      .filter(property => {
        return filters.price ? property.priceId.toString() === filters.price.toString() : property
      })

      showProperties(result)
    }
    
    getProperties()
    
  })()