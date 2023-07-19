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

  update({ name, birthday, be, id, idUser }) {
    return this.database.query(
      `update ${this.table} set name = ?, birthday = ?, be = ? where id = ? and id_user = ?`,
      [name, birthday, be, id, idUser]
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

  deleteFriend({ id, idUser }) {
    return this.database.query(
      `delete from ${this.table} where id = ? and id_user = ?`,
      [id, idUser]
    );
  }
}

module.exports = FriendManager;
