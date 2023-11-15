// eslint-disable-next-line no-shadow
function isMeetingWithinWorkingHours(startTime, endTime, meetingStart, meetingDuration) {
  const workingStart = new Date(`2000-01-01 ${startTime}`);
  const workingEnd = new Date(`2000-01-01 ${endTime}`);
  const meetingStartTime = new Date(`2000-01-01 ${meetingStart}`);
  const meetingEnd = new Date(meetingStartTime.getTime() + meetingDuration * 60000);
  return meetingStartTime >= workingStart && meetingEnd <= workingEnd;
}

// eslint-disable-next-line no-unused-vars
const isMeetingWithinWorkingHoursResult = isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90);

