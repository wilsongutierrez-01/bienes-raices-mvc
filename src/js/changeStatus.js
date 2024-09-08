(function() {
  const changeStatusButtons = document.querySelectorAll('.change-status')
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  changeStatusButtons.forEach(button => {
    button.addEventListener('click', changeStatusProperty)
  })

  async function changeStatusProperty(event) {

    const { propertyId: id} = event.target.dataset

    try{
      const url = `/properties/${id}`
      
      const response = await fetch(url,{
        method: 'PUT',
        headers:{
          'CSRF-token': token
        }
      })

      const {result} = await response.json()

      if (result){
        if (event.target.classList.contains('bg-yellow-100')){
          event.target.classList.add('bg-green-100', 'text-green-800')
          event.target.classList.remove('bg-yellow-100', 'text-yellow-800')
          event.target.textContent = 'Published'
        } else {
          event.target.classList.add('bg-yellow-100', 'text-yellow-800')
          event.target.classList.remove('bg-green-100', 'text-green-800')
          event.target.textContent = 'Unpublished'
        }
      }
      
    } catch (error) {
      console.error(error)
    }
    
  }

})()