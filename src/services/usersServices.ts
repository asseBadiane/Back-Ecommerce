import { User } from "../models/user";
import { Database } from "../database/database";
export class UserService {
  private db: Database; // initialize the database
  constructor() {
    this.db = new Database(); // create an instance of the database
  }

  // GET ALL USERS
  async getAll(): Promise<User[]> {
    const users: User[] = await this.db.query("SELECT * FROM users");
    return users;
  }

  // GET USER BY ID
  async getById(id: string): Promise<User> {
    const users: User[] = await this.db.query(
      "SELECT * FROM users where id=?",
      [id]
    );
    //const user2:User= await  this.db.query(`SELECT * FROM users where id=${id}`);
    //const user3:User= await  this.db.query("SELECT * FROM users where id="+id);
    if (users.length > 0) {
      return users[0];
    }
    throw new Error(`Aucun utilisateur trouvé avec l'ID ${id}`); // Rejeter la promesse avec un message d'erreur approprié;
  }

  // CHECK IF USER EXISTS
  async notExist(username: string): Promise<boolean> {
    const users: User[] = await this.db.query(
      "SELECT * FROM users where username=?",
      [username]
    );
    return users.length === 0;
  }

  // CREATE USER
  async create(newUser: User): Promise<User> {
    const result = await this.db.query(
      "INSERT INTO users(username,email,password,role) VALUES (?,?,?,?)",
      [newUser.username, newUser.email, newUser.password, newUser.role]
    );

    //newUser.id = result.lastId;
    return newUser;
  }

  // DELETE USER
  async delete(id: string): Promise<any> {
    const result: any = await this.db.query("DELETE   FROM users where id=?", [
      id,
    ]);
    return result;
  }

  // UPDATE USER
  async update(user: User): Promise<User> {
    const result = await this.db.query(
      "UPDATE users SET  username=?, email=?, role=?  where id = ?",
      [user.username, user.email, user.role, user.id]
    );
    return result;
  }
  /*async resetPassword(user:User, newPassword) : Promise <User> {
    const result= await this.db.query("UPDATE  FROM  users where id = ? SET  firstname=? , lastname=? ", [newUser.firstname,newUser.lastname,newUser.login, newUser.password]);
 
  }*/
}
