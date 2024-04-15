const userService = require("../services/usersServices");

// GET ALL USERS
exports.getAll = (req, res) => {
    userService.getAll(function(err, list_users) {
      if (err) {
        // Gérer l'erreur
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
        return;
      }
      // Renvoyer les données récupérées
      res.json(list_users);
    });
  };
  

// GET USER BY ID
exports.getById = (req, res) => {
    const id = req.params.id;
    userService.getById(id, function(err, data) {
      if (err) {
        // Gérer l'erreur
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }
      // Renvoyer les données de l'utilisateur
      res.json(data);
    });
  };
  

// CREATE USER
exports.create = (req, res) => {
    const { username, email, password, role } = req.body;
    if (
      username === undefined ||
      email === undefined ||
      password === undefined ||
      role === undefined
    ) {
      res.status(400).json({ message: "Le corps de la requête ne correspond pas au contrat" });
    } else {
      if (userService.notExist(username)) {
        const user = { username, email, password, role };
        const data = userService.create(user);
        res.status(201).json(data);
      } else {
        res.status(400).json({ message: "Un utilisateur existe déjà avec le même mot de passe" });
      }
    }
  };

// UPDATE USER
exports.update = (req, res) => {
  const id = req.params.id;
  const user = req.body;
//   const { username, email, password, role } = req.body;
  const data = userService.update(id, user);
  res.status(200).json(data);
};

exports.delete = (req, res) => {
  const id = req.params.id;
  userService.delete(id);
  res.status(200).json({ message: `Utilisateur supprimé avec succès` });
};



  