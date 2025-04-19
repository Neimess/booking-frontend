import { faker } from '@faker-js/faker';

// Установка локали для создания русских имен и адресов
faker.setLocale('ru');

// Генерация случайных отелей
const generateHotels = (count = 15) => {
    const hotels = [];
    const cities = ['Москва', 'Санкт-Петербург', 'Сочи', 'Казань', 'Екатеринбург', 'Калининград'];
    const types = ['Отель', 'Апартаменты', 'Гостевой дом', 'Хостел', 'Вилла'];
    const amenities = ['Бесплатный Wi-Fi', 'Бассейн', 'Спа', 'Тренажерный зал', 'Ресторан', 'Парковка', 'Завтрак включен'];

    for (let i = 0; i < count; i++) {
        const id = i + 1;
        const city = cities[Math.floor(Math.random() * cities.length)];
        const lat = 55.75 + (Math.random() * 0.3 - 0.15);
        const lng = 37.62 + (Math.random() * 0.3 - 0.15);

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
                faker.image.urlLoremFlickr({ category: 'hotel' })
            ],
            city,
            coords: [lat, lng],
            stars: Math.floor(Math.random() * 5) + 1,
            amenities: amenities.filter(() => Math.random() > 0.5),
            roomsList: generateRooms(Math.floor(Math.random() * 4) + 1, id),
        });
    }

    return hotels;
};

// Генерация комнат для отеля
const generateRooms = (count, hotelId) => {
    const rooms = [];
    const types = ['Стандартный номер', 'Люкс', 'Семейный номер', 'Одноместный', 'Апартаменты'];
    const beds = ['1 двуспальная кровать', '2 односпальные кровати', '1 двуспальная и 1 односпальная кровать'];

    for (let i = 0; i < count; i++) {
        rooms.push({
            id: `${hotelId}-${i + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            price: Math.floor(Math.random() * 10000) + 2000,
            capacity: Math.floor(Math.random() * 3) + 1,
            description: faker.lorem.paragraph(),
            beds: beds[Math.floor(Math.random() * beds.length)],
            amenities: ['Кондиционер', 'Телевизор', 'Холодильник', 'Сейф', 'Ванная комната'].filter(() => Math.random() > 0.3),
            availability: Math.random() > 0.2,
            size: Math.floor(Math.random() * 30) + 15,
            image: faker.image.urlLoremFlickr({ category: 'bedroom' }),
        });
    }

    return rooms;
};

// Генерация бронирований
const generateBookings = (count = 5) => {
    const hotels = generateHotels();
    const bookings = [];
    const statuses = ['confirmed', 'pending', 'cancelled'];

    for (let i = 0; i < count; i++) {
        const hotel = hotels[Math.floor(Math.random() * hotels.length)];
        const room = hotel.roomsList[Math.floor(Math.random() * hotel.roomsList.length)];
        const checkInDate = faker.date.soon({ days: 30 });
        const nights = Math.floor(Math.random() * 7) + 1;
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + nights);

        bookings.push({
            id: i + 1,
            hotel: {
                id: hotel.id,
                name: hotel.name,
                address: hotel.address,
                image: hotel.images[0],
                rating: hotel.rating,
                stars: hotel.stars,
            },
            room: {
                id: room.id,
                type: room.type,
                price: room.price,
            },
            checkInDate,
            checkOutDate,
            nights,
            guests: Math.floor(Math.random() * 3) + 1,
            totalPrice: room.price * nights,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            bookingDate: faker.date.recent(),
            isPaid: Math.random() > 0.3,
        });
    }

    return bookings;
};

// Mock API сервис
const mockApi = {
    // Поиск доступных отелей
    searchHotels: async (city, checkIn, checkOut, guests = 1) => {
        // Имитация задержки запроса
        await new Promise(resolve => setTimeout(resolve, 800));

        const hotels = generateHotels();

        // Если указан город, фильтруем по нему
        if (city) {
            return hotels.filter(hotel =>
                hotel.city.toLowerCase().includes(city.toLowerCase())
            );
        }

        return hotels;
    },

    // Получение детальной информации по отелю
    getHotelById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const hotels = generateHotels();
        return hotels.find(hotel => hotel.id === parseInt(id, 10)) || null;
    },

    // Получение списка бронирований пользователя
    getMyBookings: async (userId) => {
        await new Promise(resolve => setTimeout(resolve, 700));

        return generateBookings();
    },

    // Получение информации о конкретном бронировании
    getBookingById: async (bookingId) => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const bookings = generateBookings(10);
        return bookings.find(booking => booking.id === parseInt(bookingId, 10)) || null;
    },

    // Создание нового бронирования
    createBooking: async (bookingData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            id: Date.now(),
            ...bookingData,
            status: 'confirmed',
            bookingDate: new Date(),
        };
    },

    // Отмена бронирования
    cancelBooking: async (bookingId) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        return { success: true };
    },

    // Для админ-панели: получить все бронирования
    getAllBookings: async () => {
        await new Promise(resolve => setTimeout(resolve, 900));

        return generateBookings(20);
    },
};

export default mockApi; 