import * as auth from './auth';
import * as bookings from './bookings';
import * as clients from './clients';
import * as hotels from './hotels';
import * as rooms from './rooms';

export { auth, bookings, clients, hotels, rooms };
export default { ...auth, ...bookings, ...clients, ...hotels, ...rooms };