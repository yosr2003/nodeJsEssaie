import ProgrammeElectoralModel from "../Models/ProgrammeElectoral.js"; 

const ProgrammeElectoralController = {
  find: async (req, res) => {
    try {
      let found = await ProgrammeElectoralModel.find({ name: req.params.titre });
      res.json(found);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  

 
};

export default ProgrammeElectoralController;
