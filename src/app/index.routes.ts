import studentRoute from './controllers/student/student.routes';
import deanRoutes from './controllers/dean/dean.routes';
import slotRoutes from './controllers/slots/slot.routes';
import userRoutes from './controllers/users/user.routes';

export const routes = [
    studentRoute,
    deanRoutes,
    slotRoutes,
    userRoutes
]