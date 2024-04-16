const db = require("../db");

export const userService = {

// GET ALL USERS
  getAll (callback: any) {
  let usersJson: any = [];
  db.each(
    "SELECT * FROM users",
    function (err: any, row: any) {
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
},

// GET USER BY ID
//   getById(id: number, callback: any) {
//   db.get("SELECT * FROM users WHERE id = ?", id, function (err: any, row: any) {
//     if (err) {
//       console.error("Erreur lors de la récupération de l'utilisateur :", err);
//       callback(err, null); // Renvoyer l'erreur au callback
//       return;
//     }
//     console.log("utilisateur :", row);
//     callback(null, row); // Renvoyer les données de l'utilisateur au callback
//   });
// },

getById(id: number, callback: any) {
  // Utiliser une requête SQL pour récupérer l'utilisateur avec l'ID spécifié
  db.get("SELECT * FROM users WHERE id = ?", id, function (err: any, row: any) {
    if (err) {
      // Si une erreur se produit lors de l'exécution de la requête SQL, enregistrer l'erreur dans la console
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
      // Renvoyer l'erreur au callback avec null pour les données
      callback(err, null);
      return;
    }
    // Si aucun erreur ne se produit, enregistrer les données de l'utilisateur dans la console
    console.log("Utilisateur :", row);
    // Renvoyer les données de l'utilisateur au callback avec null pour l'erreur
    callback(null, row);
  });
},


// IF USER NOT EXIST
  notExist(username: string) {
  return db.get("SELECT * FROM users WHERE username = ?", username, function (err: any, row: string) {
       if (err) {
         console.error("Erreur lors de la sélection de l'utilisateur :", err);
         callback(err, null); // Renvoyer l'erreur au callback
         return ;;
       }
     });
},

  create (user: any) {
  db.prepare(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)"
  ).run(user.username, user.email, user.password, user.role);
  console.log(user);
  return user;
},

// UPDATE USER
  update (userId: number, user: any) {
  db.run('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?', [user.username, user.email, user.password, user.role, userId], function(err: any) {
      if (err) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
          // res.status(500).send('Erreur interne du serveur');
          return ;
      }
  });
  console.log('Utilisateur mis à jour avec succès', user);
  return user;
},

// DELETE USER
 delete(userId: number) {
  db.run("DELETE FROM users WHERE id = ?", userId, function (err: any) {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur :", err);
      // res.status(500).send("Erreur interne du serveur");
      return;
    }
    console.log("Utilisateur supprimé avec succès");
  });
}

};
function callback(err: any, arg1: null) {
  throw new Error("Function not implemented.");
}

