const isSeller = (userId, propertyUserId) => {
  return propertyUserId.toString() === userId?.toString()
}

const formatDate = (date) => {
 const newDate = new Date(date.toISOString().slice(0, 10))

 const options = {
   weekday: 'long',
   year: 'numeric',
   month: 'long',
   day: 'numeric'
 }

  return newDate.toLocaleDateString('en-US', options)
}


export {
  isSeller,
  formatDate
}