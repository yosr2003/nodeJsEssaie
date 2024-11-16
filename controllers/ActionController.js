import ActionModel from "../Models/Action.js"; 

const ActionController = {
  find: async (req, res) => {
    try {
      let found = await ActionModel.find({ name: req.params.titre });
      res.json(found);
    } catch (error) {
      res.status(500).send(error);
    }
  },



 
};

export default ActionController;
