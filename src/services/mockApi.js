import { faker } from '@faker-js/faker';

// Установка локали для создания русских имен и адресов
faker.locale = 'ru';

// Генерация случайных отелей
const generateHotels = (count = 15) => {
    const hotels = [];
    const cities = ['Москва', 'Санкт-Петербург', 'Сочи', 'Казань', 'Екатеринбург', 'Калининград'];
    const types = ['Отель', 'Апартаменты', 'Гостевой дом', 'Хостел', 'Вилла'];
    const amenities = ['Бесплатный Wi-Fi', 'Бассейн', 'Спа', 'Тренажерный зал', 'Ресторан', 'Парковка', 'Завтрак включен'];

    for (let i = 0; i < count; i++) {
        const id = i + 1;
        const city = cities[Math.floor(Math.random() * cities.length)];

        hotels.push({
            id,
            name: `${faker.company.name()} ${types[Math.floor(Math.random() * types.length)]}`,
            address: `${city}, ${faker.location.street()}`,
            description: faker.lorem.paragraph(),
            rating: (3 + Math.random() * 2).toFixed(1),
            reviewCount: Math.floor(Math.random() * 500) + 10,
            price: Math.floor(Math.random() * 15000) + 2000,
            discountPrice: Math.random() > 0.3 ? Math.floor(Math.random() * 15000) + 2000 : null,
            images: [
                faker.image.urlLoremFlickr({ category: 'hotel' }),
                faker.image.urlLoremFlickr({ category: 'hotel' }),
                faker.image.urlLoremFlickr({ category: 'hotel' }),
            ],
            city,
            lat: 55.75 + (Math.random() * 0.3 - 0.15),
            lng: 37.62 + (Math.random() * 0.3 - 0.15),
            stars: Math.floor(Math.random() * 5) + 1,
            amenities: amenities.filter(() => Math.random() > 0.5),
        });
    }

    return hotels;
};

// Генерация случайных бронирований
const generateBookings = (clientId, count = 5) => {
    const bookings = [];
    const hotels = generateHotels(10);
    const statuses = ['confirmed', 'pending', 'completed', 'cancelled'];

    for (let i = 0; i < count; i++) {
        const hotel = hotels[Math.floor(Math.random() * hotels.length)];
        const checkInDate = faker.date.future({ years: 0.5 });
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + Math.floor(Math.random() * 7) + 1);

        bookings.push({
            id: i + 1,
            clientId: parseInt(clientId, 10),
            hotelId: hotel.id,
            hotel: {
                id: hotel.id,
                name: hotel.name,
                address: hotel.address,
                image: hotel.images[0],
                rating: hotel.rating
            },
            room: {
                id: Math.floor(Math.random() * 100) + 1,
                name: `${['Стандартный', 'Делюкс', 'Люкс', 'Семейный'][Math.floor(Math.random() * 4)]} номер`,
                price: hotel.price
            },
            startDate: checkInDate.toISOString(),
            endDate: checkOutDate.toISOString(),
            guests: Math.floor(Math.random() * 3) + 1,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            totalPrice: hotel.price * (Math.floor(Math.random() * 7) + 1),
            createdAt: faker.date.past({ years: 0.1 }).toISOString()
        });
    }

    return bookings;
};

// Сохраненные бронирования, чтобы сохранять состояние между вызовами API
let bookingsCache = {};

// Экспортируем функцию получения случайных отелей
export const getMockHotels = async () => {
    // Имитация задержки запроса
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateHotels();
};

// Получение детальной информации по отелю
export const getMockHotelById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const hotels = generateHotels();
    return hotels.find(hotel => hotel.id === parseInt(id, 10)) || null;
};

// Получение бронирований клиента
export const getMockBookings = async (clientId) => {
    await new Promise(resolve => setTimeout(resolve, 700));

    // Если у клиента еще нет бронирований, генерируем их
    if (!bookingsCache[clientId]) {
        bookingsCache[clientId] = generateBookings(clientId);
    }

    return bookingsCache[clientId];
};

// Отмена бронирования
export const cancelMockBooking = async (clientId, bookingId) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (bookingsCache[clientId]) {
        const bookingIndex = bookingsCache[clientId].findIndex(b => b.id === parseInt(bookingId, 10));

        if (bookingIndex !== -1) {
            // Отмечаем бронирование как отмененное
            bookingsCache[clientId][bookingIndex].status = 'cancelled';
            return true;
        }
    }

    return false;
};

// Создание нового бронирования
export const createMockBooking = async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const { clientId, hotelId, startDate, endDate, guests } = bookingData;
    const hotels = generateHotels();
    const hotel = hotels.find(h => h.id === parseInt(hotelId, 10));

    if (!hotel) {
        throw new Error('Hotel not found');
    }

    if (!bookingsCache[clientId]) {
        bookingsCache[clientId] = [];
    }

    const newBooking = {
        id: Date.now(),
        clientId: parseInt(clientId, 10),
        hotelId: hotel.id,
        hotel: {
            id: hotel.id,
            name: hotel.name,
            address: hotel.address,
            image: hotel.images[0],
            rating: hotel.rating
        },
        room: {
            id: Math.floor(Math.random() * 100) + 1,
            name: `${['Стандартный', 'Делюкс', 'Люкс', 'Семейный'][Math.floor(Math.random() * 4)]} номер`,
            price: hotel.price
        },
        startDate,
        endDate,
        guests,
        status: 'confirmed',
        totalPrice: hotel.price * (Math.floor(Math.random() * 7) + 1),
        createdAt: new Date().toISOString()
    };

    bookingsCache[clientId].push(newBooking);
    return newBooking;
};

// Экспорт всех функций
export default {
    getMockHotels,
    getMockHotelById,
    getMockBookings,
    cancelMockBooking,
    createMockBooking
}; 