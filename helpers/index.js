const isSeller = (userId, propertyUserId) => {
  return propertyUserId.toString() === userId?.toString()
}

export {
  isSeller
}