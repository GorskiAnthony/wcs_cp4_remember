const AbstractManager = require("./AbstractManager");

class FriendManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ name, birthday, idUser, be }) {
    return this.database.query(
      `insert into ${this.table} (name, birthday, idUser, be) values (?, ?, ?)`,
      [name, birthday, idUser, be]
    );
  }

  update({ name, birthday, id }) {
    return this.database.query(
      `update ${this.table} set name = ?, birthday = ?, where id = ?`,
      [name, birthday, id]
    );
  }

  findFriends({ idUser }) {
    return this.database.query(
      `SELECT f.id_friend, f.name AS friend_name, f.birthday, f.be
            FROM FRIEND AS f
            INNER JOIN USER AS u ON f.id_user = u.id_user
            WHERE u.id_user = ?`,
      [idUser]
    );
  }
}

module.exports = FriendManager;
