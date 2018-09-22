const notificationMessages = {
  // Auth
  adminRequiredMsg: 'Login with admin credentials required',
  alreadyLoggedInMsg: 'Logout to change credentials',
  loginRequiredMsg: 'Login required',
  loginSuccessMsg: 'Login successful',
  logoutSuccessMsg: 'Logout successful',
  registrationSuccessMsg: 'Registration successful',
  // Courses
  courseCancelEnrollmentMsg: 'Course enrollment cancelled',
  courseCreatedMsg: 'Course created',
  courseDeletedMsg: 'Course deleted',
  courseEditedMsg: 'Course updated',
  courseEnrolledMsg: 'Enrolled in course',
  courseNotFoundMsg: 'Course not found',
  courseUpdateFailureMsg: 'Unable to update course',
  // Feedbacks
  feedbackCreatedMsg: 'Feedback added',
  feedbackDeletedMsg: 'Feedback deleted',
  // Invalid
  invalidUserOrCourseMsg: 'Invalid user or course'
};

const notificationTitles = {
  // Common
  errorTitle: 'Error',
  infoTitle: 'Info',
  successTitle: 'Success',
  warningTitle: 'Warning',
  // Auth
  adminRequiredTitle: 'Admin access',
  alreadyLoggedInTitle: 'Already logged in',
  loginRequiredTitle: 'Authenticated access'
};

export { notificationMessages, notificationTitles };
