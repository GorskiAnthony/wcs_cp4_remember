const models = require("../models");

const browse = (req, res) => {
  models.friend
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseFriends = (req, res) => {
  models.friend
    .findFriends({ idUser: +req.user.id })
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.friend
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null || rows[0].id_user !== req.user.id) {
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
  // Ajout de l'id de l'ami
  user.id = req.params.id;
  // Ajout de l'id de l'utilisateur connecté
  user.idUser = parseInt(req.user.id, 10);

  models.friend
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

const add = (req, res) => {
  const friend = req.body;
  friend.idUser = parseInt(req.user.id, 10);

  // TODO validations (length, format...)

  models.friend
    .insert(friend)
    .then(([result]) => {
      res
        .status(201)
        .send({ message: "New friend added", id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  const idUser = req.user.id;

  const userToDelete = { id, idUser };

  models.friend
    .deleteFriend(userToDelete)
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
  browseFriends,
};
