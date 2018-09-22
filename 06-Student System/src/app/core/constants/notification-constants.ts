const notificationMessages = {
  // Auth
  adminRequiredMsg: 'Login with admin credentials required',
  alreadyLoggedInMsg: 'Logout to change credentials',
  loginRequiredMsg: 'Login required',
  // Courses
  courseNotFoundMsg: 'Course not found',
  courseCreatedMsg: 'Course created',
  courseDeletedMsg: 'Course deleted',
  courseEditedMsg: 'Course updated',
  courseUpdateFailureMsg: 'Unable to update course',
  courseEnrolledMsg: 'Enrolled in course',
  courseCancelEnrollmentMsg: 'Course enrollment cancelled',
  // Feedbacks
  feedbackCreatedMsg: 'Feedback added',
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
