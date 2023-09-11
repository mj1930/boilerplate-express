import studentRoute from './controllers/student/student.routes';
import deanRoutes from './controllers/dean/dean.routes';
import slotRoutes from './controllers/slots/slot.routes';

export const routes = [
    studentRoute,
    deanRoutes,
    slotRoutes
]