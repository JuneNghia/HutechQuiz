export const formattedValuePrice = (value) => value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
