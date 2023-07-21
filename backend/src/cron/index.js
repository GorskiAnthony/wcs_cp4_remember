const { CronJob } = require("cron");
const { getBirthday, getUserFriend } = require("./utils/getFunctions");
const { calculateTimeRemaining } = require("../services/calculeDate.service");
const sendingMail = require("./utils/sendMail");

// eslint-disable-next-line no-unused-vars
const TO_MIDNIGHT = "00 00 00 * * *";
// eslint-disable-next-line no-unused-vars
const TO_EVERY_TEN_SECONDS = "*/10 * * * * *";
const TO_EVERY_MINUTE = "00 * * * * *";

async function sendBirthdayEmail(user) {
  try {
    const [[userFriend]] = await getUserFriend(user.id);
    await sendingMail(userFriend.email, user.name);
  } catch (error) {
    console.error(error);
  }
}

async function checkBirthdays() {
  try {
    const [res] = await getBirthday();

    res.forEach((user) => {
      const { days } = calculateTimeRemaining(user.birthday);
      if (days === 0) {
        sendBirthdayEmail(user);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

const job = new CronJob(
  TO_EVERY_MINUTE,
  checkBirthdays,
  null,
  true,
  "Europe/Berlin"
);

job.start();
