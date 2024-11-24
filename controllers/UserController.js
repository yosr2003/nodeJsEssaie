import UserModel from "../Models/User.js";

const UserController = {
  find:async (req, res) => {
    try {
      const cin = req.params.cin; 
      let found = await UserModel.findOne({ cin: cin });  
      
      if (!found) {
        return res.status(404).send("Utilisateur non trouvé");
      }
      
      res.render('profil', { found });
    } catch (error) {
      res.status(500).send(error);  
    }
  },
 

  all: async (req, res) => {
    try {
      let allUsers = await UserModel.find();
      res.render('profil',{allUsers})
    } catch (error) {
      res.status(500).send(error);
    }
  },
  create: async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  ,
   update : async (req, res) => {
    try {
      const cin = req.params.cin;
      const updates = req.body;
  
      // Ensure updates only contain allowed fields
      const allowedFields = ['nom', 'prenom', 'email', 'motDePasse', 'address', 'dateNais'];
      const filteredUpdates = Object.keys(updates)
        .filter(field => allowedFields.includes(field))
        .reduce((obj, field) => {
          obj[field] = updates[field];
          return obj;
        }, {});
  
      // Update the user in the database
      const updatedUser = await UserModel.findOneAndUpdate({ cin }, filteredUpdates, { new: true });
  
      if (!updatedUser) {
        return res.status(404).render('profil', { error: "Utilisateur non trouvé", found: null });
      }
  
      // Re-render the profile page with updated info
      res.render('profil', { found: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).render('profil', { error: "Une erreur s'est produite", found: null });
    }
  }
  

 
};

export default UserController;
