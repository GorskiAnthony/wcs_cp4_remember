const models = require("../models");
const { hash } = require("../services/argon2");
const userSchema = require("../schema/userSchema");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const user = req.body;

  try {
    // Vérifier que l'email n'est pas déjà utilisé
    const [existingUser] = await models.user.findByEmail(user.email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already used" });
    }

    // vérification avec Joi
    const { error } = userSchema.validate(user);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(user.password);
    user.password = hashedPassword;

    await models.user.insert(user);
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
