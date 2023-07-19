const models = require("../models");
const { hash, verifyPwd } = require("../services/argon2");
const userSchema = require("../schema/userSchema");
const { createToken } = require("../services/jwt");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      rows.forEach((user) => {
        // eslint-disable-next-line no-param-reassign
        delete user.password;
      });
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.user.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        // eslint-disable-next-line no-param-reassign
        delete rows[0].password;
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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier que l'email existe
    const [existingUser] = await models.user.findByEmail(email);
    if (existingUser.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Vérifier que le mot de passe est correct
    const isValid = await verifyPwd(existingUser[0].password, password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Générer un token
    const token = createToken(existingUser[0]);

    // Envoyer le token dans un cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.status(200).json({ message: "Logged in" });
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
  login,
  destroy,
};
