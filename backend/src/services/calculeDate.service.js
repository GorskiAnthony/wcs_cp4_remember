function calculateTimeRemaining(birthday) {
  const birthdayDate = new Date(birthday);
  birthdayDate.setDate(birthdayDate.getDate() + 1);
  const todayDate = new Date();
  const nextBirthday = new Date(
    todayDate.getFullYear(),
    birthdayDate.getMonth(),
    birthdayDate.getDate()
  );

  if (nextBirthday < todayDate) {
    // If this year's birthday has already passed, add one year for the next birthday
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const timeRemaining = nextBirthday - todayDate;
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return {
    days,
  };
}

module.exports = {
  calculateTimeRemaining,
};
