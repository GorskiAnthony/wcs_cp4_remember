const AbstractManager = require("./AbstractManager");

class FriendManager extends AbstractManager {
  constructor() {
    super({ table: "friend" });
  }

  insert({ name, birthday, idUser, be }) {
    return this.database.query(
      `insert into ${this.table} (name, birthday, id_user, be) values (?, ?, ?, ?)`,
      [name, birthday, idUser, be]
    );
  }

  update({ name, birthday, be, id }) {
    return this.database.query(
      `update ${this.table} set name = ?, birthday = ?, be = ? where id = ?`,
      [name, birthday, be, id]
    );
  }

  findFriends({ idUser }) {
    return this.database.query(
      `SELECT f.id AS id_friend, f.name AS friend_name, f.birthday, f.be
        FROM FRIEND AS f
        INNER JOIN USER AS u ON f.id_user = u.id
        WHERE u.id = ?;
        `,
      [idUser]
    );
  }
}

module.exports = FriendManager;
