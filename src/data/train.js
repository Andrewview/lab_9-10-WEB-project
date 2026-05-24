/**
 * trains.js — Mock дані потягів
 * Імітує відповідь від API
 */

export const trains = [
  {
    id: 'IC-741',
    number: '741 ІС',
    type: 'Інтерсіті+',
    from: { city: 'Київ', station: 'Головний', code: 'KYI' },
    to:   { city: 'Львів', station: 'Головний', code: 'LVI' },
    departure: '2025-06-10T07:00:00',
    arrival:   '2025-06-10T12:15:00',
    duration:  '5г 15хв',
    wagons: [
      { id: 'w1', number: 1, type: 'Люкс',    seats: 18, price: 1850 },
      { id: 'w2', number: 2, type: 'Купе',     seats: 36, price: 1100 },
      { id: 'w3', number: 3, type: 'Купе',     seats: 36, price: 1100 },
      { id: 'w4', number: 4, type: 'Плацкарт', seats: 54, price: 650  },
    ],
  },
  {
    id: 'IC-743',
    number: '743 ІС',
    type: 'Інтерсіті',
    from: { city: 'Київ', station: 'Головний', code: 'KYI' },
    to:   { city: 'Одеса', station: 'Головний', code: 'ODE' },
    departure: '2025-06-10T08:30:00',
    arrival:   '2025-06-10T14:45:00',
    duration:  '6г 15хв',
    wagons: [
      { id: 'w1', number: 1, type: 'Купе',     seats: 36, price: 980  },
      { id: 'w2', number: 2, type: 'Купе',     seats: 36, price: 980  },
      { id: 'w3', number: 3, type: 'Плацкарт', seats: 54, price: 520  },
      { id: 'w4', number: 4, type: 'Плацкарт', seats: 54, price: 520  },
    ],
  },
  {
    id: 'RE-111',
    number: '111 РЕ',
    type: 'Регіональний Експрес',
    from: { city: 'Харків', station: 'Головний', code: 'KHR' },
    to:   { city: 'Дніпро', station: 'Головний', code: 'DNE' },
    departure: '2025-06-10T09:15:00',
    arrival:   '2025-06-10T12:30:00',
    duration:  '3г 15хв',
    wagons: [
      { id: 'w1', number: 1, type: 'Купе',     seats: 36, price: 720  },
      { id: 'w2', number: 2, type: 'Плацкарт', seats: 54, price: 380  },
      { id: 'w3', number: 3, type: 'Плацкарт', seats: 54, price: 380  },
    ],
  },
  {
    id: 'IC-745',
    number: '745 ІС',
    type: 'Інтерсіті+',
    from: { city: 'Київ', station: 'Головний', code: 'KYI' },
    to:   { city: 'Харків', station: 'Головний', code: 'KHR' },
    departure: '2025-06-10T10:00:00',
    arrival:   '2025-06-10T14:10:00',
    duration:  '4г 10хв',
    wagons: [
      { id: 'w1', number: 1, type: 'Люкс',    seats: 18, price: 2100 },
      { id: 'w2', number: 2, type: 'Купе',     seats: 36, price: 1250 },
      { id: 'w3', number: 3, type: 'Купе',     seats: 36, price: 1250 },
      { id: 'w4', number: 4, type: 'Плацкарт', seats: 54, price: 720  },
      { id: 'w5', number: 5, type: 'Плацкарт', seats: 54, price: 720  },
    ],
  },
  {
    id: 'RE-222',
    number: '222 РЕ',
    type: 'Регіональний',
    from: { city: 'Львів', station: 'Головний', code: 'LVI' },
    to:   { city: 'Ужгород', station: 'Головний', code: 'UZH' },
    departure: '2025-06-10T11:45:00',
    arrival:   '2025-06-10T15:20:00',
    duration:  '3г 35хв',
    wagons: [
      { id: 'w1', number: 1, type: 'Купе',     seats: 36, price: 560  },
      { id: 'w2', number: 2, type: 'Плацкарт', seats: 54, price: 290  },
    ],
  },
  {
    id: 'IC-101',
    number: '101 ІС',
    type: 'Інтерсіті+',
    from: { city: 'Київ', station: 'Головний', code: 'KYI' },
    to:   { city: 'Запоріжжя', station: 'І', code: 'ZAP' },
    departure: '2025-06-10T13:20:00',
    arrival:   '2025-06-10T19:50:00',
    duration:  '6г 30хв',
    wagons: [
      { id: 'w1', number: 1, type: 'Люкс',    seats: 18, price: 1950 },
      { id: 'w2', number: 2, type: 'Купе',     seats: 36, price: 1150 },
      { id: 'w3', number: 3, type: 'Плацкарт', seats: 54, price: 680  },
    ],
  },
]

/**
 * Генерує масив місць для вагону
 * booked — набір зайнятих номерів місць (із localStorage)
 */
export const generateSeats = (wagon, bookedSet = new Set()) => {
  return Array.from({ length: wagon.seats }, (_, i) => ({
    id:     i + 1,
    number: i + 1,
    status: bookedSet.has(i + 1) ? 'booked' : 'free', // free | booked | selected
  }))
}