const { CronJob } = require("cron");
const { getBirthday, getUserFriend } = require("./utils/getFunctions");
const { calculerTempsRestant } = require("../services/calculeDate.service");

// eslint-disable-next-line no-unused-vars
const TO_MIDNIGHT = "00 00 00 * * *";
// eslint-disable-next-line no-unused-vars
const TO_EVERY_MINUTE = "00 * * * * *";
const TO_EVERY_TEN_SECONDS = "*/10 * * * * *";

async function sendBirthdayEmail(user) {
  try {
    const [[userFriend]] = await getUserFriend(user.id);
    console.info("J'envoi un mail à : ", userFriend.email);
    console.info(
      "Avec le message : ",
      `C'est l'anniversaire de votre ami: ${user.name}`
    );
  } catch (error) {
    console.error(error);
  }
}

async function checkBirthdays() {
  try {
    const [res] = await getBirthday();

    res.forEach((user) => {
      const { jours } = calculerTempsRestant(user.birthday);
      if (jours === 0) {
        sendBirthdayEmail(user);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

const job = new CronJob(
  TO_EVERY_TEN_SECONDS,
  checkBirthdays,
  null,
  true,
  "Europe/Berlin"
);

job.start();
