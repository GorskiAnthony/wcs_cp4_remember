const models = require("../../models");

async function getBirthday() {
  try {
    return await models.friend.findAll();
  } catch (error) {
    console.error(error);
  }
  return null;
}

async function getUserFriend(id) {
  try {
    return await models.friend.findUser(id);
  } catch (error) {
    console.error(error);
  }
  return null;
}

module.exports = { getBirthday, getUserFriend };
