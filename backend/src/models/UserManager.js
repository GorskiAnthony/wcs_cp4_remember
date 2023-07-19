const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmail(email) {
    return this.database.query(`select * from ${this.table} where email = ?`, [
      email,
    ]);
  }

  isAdmin(id) {
    return this.database.query(
      `select * from ${this.table} where id = ? and isAdmin = 1`,
      [id]
    );
  }

  insert({ name, email, password }) {
    return this.database.query(
      `insert into ${this.table} (name, email, password) values (?, ?, ?)`,
      [name, email, password]
    );
  }

  update({ name, email, id }) {
    return this.database.query(
      `update ${this.table} set name = ?, email = ? where id = ?`,
      [name, email, id]
    );
  }

  updatePassword({ password, id }) {
    return this.database.query(
      `update ${this.table} set password = ? where id = ?`,
      [password, id]
    );
  }
}

module.exports = UserManager;
