import { environment } from '../../../environments/environment';

const dbConstants = {
  dbUrl: environment.firebase.databaseURL,
  users: 'users',
  courses: 'courses',
  students: 'students',
  feedbacks: 'feedbacks',
  studentCourses: 'studentCourses',
  trainerCourses: 'trainerCourses',
  json: '.json',
  // Roles
  roles: 'roles',
  adminRole: 'admin'
};

export default dbConstants;
