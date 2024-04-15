const db = require("../db");


// GET ALL USERS
exports.getAll = (callback) => {
  let usersJson = [];
  db.each(
    "SELECT * FROM users",
    function (err, row) {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        callback(err, null);
        return;
      }
      usersJson.push(row);
      console.log(row);
    },
    function () {
      callback(null, usersJson);
    }
  );
};

// GET USER BY ID
exports.getById = (id, callback) => {
  db.get("SELECT * FROM users WHERE id = ?", id, function (err, row) {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
      callback(err, null); // Renvoyer l'erreur au callback
      return;
    }

    console.log("utilisateur :", row);
    callback(null, row); // Renvoyer les données de l'utilisateur au callback
  });
};

// IF USER NOT EXIST
exports.notExist = (username) => {
  db.get("SELECT * FROM users WHERE username = ?", username, function (err, row) {
    if (err) {
      console.error("Erreur lors de la sélection de l'utilisateur :", err);
      callback(err, null); // Renvoyer l'erreur au callback
      return;
    }
  });
};

exports.create = (user) => {
  db.prepare(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)"
  ).run(user.username, user.email, user.password, user.role);
  console.log(user);
  return user;
};

// UPDATE USER
exports.update = (userId, user) => {
  db.run('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?', [user.username, user.email, user.password, user.role, userId], function(err) {
      if (err) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
          res.status(500).send('Erreur interne du serveur');
          return;
      }
  });
  console.log('Utilisateur mis à jour avec succès', user);
  return user;
};

// DELETE USER
exports.delete = (userId) => {
  db.run("DELETE FROM users WHERE id = ?", userId, function (err) {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }
    console.log("Utilisateur supprimé avec succès");
  });
};

