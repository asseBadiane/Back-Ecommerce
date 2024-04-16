// import { userService } from "../services/usersServices";
import { Request, Response } from "express";
import { userService } from "../services/usersServices";

export const userController = {

// GET ALL USERS
  getAll(req: Request, res: Response) {
    userService.getAll(function(err: any, list_users: []) {
      if (err) {
        // Gérer l'erreur
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
        return;
      }
      // Renvoyer les données récupérées
      res.json(list_users);
    });
  },
  

  // GET USER BY ID
  getById (req: Request, res: Response) {
    const id: any = req.params.id;
    userService.getById(id, function(err: any, data: any) {
      if (err) {
        // Gérer l'erreur
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }
      // Renvoyer les données de l'utilisateur
      res.json(data);
    });
  },
  

  // CREATE USER
   create(req: Request, res: Response) {
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
  },

// UPDATE USER
  update (req: Request, res: Response) {
  const id: any = req.params.id;
  const user = req.body;
//   const { username, email, password, role } = req.body;
  const data = userService.update(id, user);
  res.status(200).json(data);
},

  delete(req: Request, res: Response) {
  const id: any = req.params.id;
  userService.delete(id);
  res.status(200).json({ message: `Utilisateur supprimé avec succès` });
},


};
  