// const reservations = [
//   {
//     0: 'SUDN',
//     1: '1',
//     2: 'GRPL',
//     3: 'INTE',
//     4: 'GGR',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '230',
//     9: 'Camacho Perez,Guadalupe',
//     10: 'All Inclusive',
//     11: '100200101',
//     12: '1',
//   },
//   {
//     0: 'SUDN',
//     1: '2',
//     2: 'GRPL',
//     3: 'INTE',
//     4: '6:00 p.m.',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '231',
//     9: 'L�pez,Luis',
//     10: 'Normal',
//     11: '100200102',
//     12: '2',
//   },
//   {
//     0: 'SUDN',
//     1: '2',
//     2: 'GRPL',
//     3: 'INTE',
//     4: '6:00 p.m.',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '232',
//     9: 'Fern�ndez,Alejandro',
//     10: 'All Inclusive',
//     11: '100200103',
//     12: '1',
//   },
//   {
//     0: 'SUDN',
//     1: '2',
//     2: 'GRPL',
//     3: 'INTE',
//     4: '6:00 p.m.',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '233',
//     9: 'Aldama,Juan',
//     10: 'Normal',
//     11: '100200104',
//     12: '1',
//   },
//   {
//     0: 'SUDN',
//     1: '1',
//     2: 'GRPL',
//     3: 'INTE',
//     4: 'GGR',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '234',
//     9: 'L�pez,Pedro',
//     10: 'All Inclusive',
//     11: '100200105',
//     12: '2',
//   },
//   {
//     0: 'PNKV',
//     1: '1',
//     2: 'GRPL',
//     3: 'INTE',
//     4: 'GGR',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '235',
//     9: 'P�rez,Fernanda',
//     10: 'Normal',
//     11: '100200106',
//     12: '1',
//   },
//   {
//     0: 'PNKV',
//     1: '1',
//     2: 'GRPL',
//     3: 'INTE',
//     4: 'GGR',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '236',
//     9: 'Garc�a,Luis',
//     10: 'All Inclusive',
//     11: '100200107',
//     12: '2',
//   },
//   {
//     0: 'PNKV',
//     1: '3',
//     2: 'GRPL',
//     3: 'INTE',
//     4: 'GGR',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '237',
//     9: 'Parra,Andrea',
//     10: 'Normal',
//     11: '100200108',
//     12: '1',
//   },
//   {
//     0: 'SUDN',
//     1: '2',
//     2: 'GRPL',
//     3: 'INTE',
//     4: 'GGR',
//     5: 'Compa��a',
//     6: '17/12/20',
//     7: '21/12/20',
//     8: '238',
//     9: 'Garc�a,Bernardo',
//     10: 'All Inclusive',
//     11: '100200109',
//     12: '1',
//   },
// ]

// const columnHeaders = [
//   { Header: 'Tipo de Habitaci�n', accessor: '0' },
//   { Header: 'Adultos ', accessor: '1' },
//   { Header: 'Segmento', accessor: '2' },
//   { Header: 'Source', accessor: '3' },
//   { Header: 'Garantia', accessor: '4' },
//   { Header: 'Compa��a ', accessor: '5' },
//   { Header: 'Check in', accessor: '6' },
//   { Header: 'Check out', accessor: '7' },
//   { Header: 'Room Number', accessor: '8' },
//   { Header: 'Nombre', accessor: '9' },
//   { Header: 'Tipo de reservaci�n', accessor: '10' },
//   { Header: 'N�mero de Reserva', accessor: '11' },
//   { Header: 'Ni�os', accessor: '12' },
// ]

// const colRel = {
//   firstName: 'Nombre',
//   arrivalDate: 'Check in',
//   departureDate: 'Check out',
//   adultsCount: 'Adultos ',
//   childrenCount: 'Ni�os',
//   createdBy: 'Source',
//   reservationNumber: 'N�mero de Reserva',
//   reservationType: 'Tipo de reservaci�n',
// }

export function processCSVReservationObj(reservation, columnHeaders, columnRelationship, firstNameAndLastNameOrder) {
  const output1 = columnHeaders.reduce((acc, { Header, accessor }) => {
    // console.log(Header, singleRes[accessor], acc)
    acc[Header] = reservation[accessor]
    return acc
  }, {})

  const mapped = Object.keys(columnRelationship).reduce((acc, key) => {
    if (firstNameAndLastNameOrder === 'firstNameConnectedByAComma' && key === 'firstName') {
      const firstNameAndLastName = output1[columnRelationship[key]].split(/,|, /)
      const [lastName, firstName] = firstNameAndLastName
      acc.occupants = [{ firstName, lastName }]
    } else if (firstNameAndLastNameOrder === 'lastNameConnectedByAComma' && key === 'firstName') {
      const firstNameAndLastName = output1[columnRelationship[key]].split(/,|, /)
      const [firstName, lastName] = firstNameAndLastName
      acc.occupants = [{ firstName, lastName }]
    } else if (firstNameAndLastNameOrder === 'firstNameConnectedByASpace' && key === 'firstName') {
      const firstNameAndLastName = output1[columnRelationship[key]].split(/ |, /)
      const [lastName, firstName] = firstNameAndLastName
      acc.occupants = [{ firstName, lastName }]
    } else if (firstNameAndLastNameOrder === 'lastNameConnectedByASpace' && key === 'firstName') {
      const firstNameAndLastName = output1[columnRelationship[key]].split(/ |, /)
      const [firstName, lastName] = firstNameAndLastName
      acc.occupants = [{ firstName, lastName }]
    } else if (firstNameAndLastNameOrder === 'firstNameAndLastNameSeparated' && key === 'firstName') {
      const firstName = output1[columnRelationship[key]]
      acc.occupants = [{ firstName, ...acc?.occupants?.[0] }]
    } else if (firstNameAndLastNameOrder && key === 'lastName') {
      const lastName = output1[columnRelationship[key]]
      acc.occupants = [{ lastName, ...acc?.occupants?.[0] }]
    } else if (key === 'childrenCount' || key === 'adultsCount') {
      acc[key] = parseInt(output1[columnRelationship[key]])
    } else if (key === 'arrivalDate') {
      acc[key] = output1[columnRelationship[key]].replaceAll('/', '-')
    } else if (key === 'departureDate') {
      acc[key] = output1[columnRelationship[key]].replaceAll('/', '-')
    } else {
      acc[key] = output1[columnRelationship[key]]
    }

    return acc
  }, {})

  return mapped
}

// const output1 = {
//   ...columnHeaders.map(({ Header, accessor }) => {
//     const newColumn = {}
//     newColumn[`${Header}`] = singleRes[accessor]

//     return newColumn
//   }),
// }

// const output2 = Object.values(columnRelationship).map((key) => {
//   console.log(output1)
//   return key
// })
