export const inputFields = [
  {
    label: 'Fecha de llegada',
    name: 'arrivalDate ',
    required: true,
  },
  {
    label: 'Fecha de salida',
    name: 'departureDate',
    required: true,
  },
  {
    label: 'Número de adultos',
    name: 'adultsCount',
    required: true,
  },
  {
    label: 'Número de niños',
    name: 'childrenCount',
    required: true,
  },

  {
    label: 'Origen de la reservación',
    name: 'createdBy',
  },
  {
    label: 'Número de la reservación',
    name: 'reservationNumber',
    required: true,
  },
  {
    label: 'Tipo de reservación',
    name: 'reservationType',
  },
]

export const separatedNameInputFields = [
  {
    label: 'Nombres',
    name: 'firstName',
    required: true,
  },
  {
    label: 'Apellido',
    name: 'lastName',
    required: true,
  },
]

export const connectedNameInputFields = [
  {
    label: 'Nombre y Apellido',
    name: 'firstName',
    required: true,
  },
]
