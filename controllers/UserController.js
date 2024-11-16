import UserModel from "../Models/User.js"; // Ensure this imports the correct Mongoose model

const UserController = {
  find: async (req, res) => {
    try {
      let found = await UserModel.find({ name: req.params.cin });
      res.json(found);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  all: async (req, res) => {
    try {
      let allUsers = await UserModel.find();
      res.json(allUsers);
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

 
};

export default UserController;
