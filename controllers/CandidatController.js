import CandidatModel from "../Models/Candidat.js";
import UserModel from "../Models/User.js"; // Ensure this imports the correct Mongoose model

const CandidatController = { 
   all: async (req, res) => {
    try {
      let allCandidats = await CandidatModel.find();
      const cin = req.params.cin; 
      let found = await UserModel.findOne({ cin: cin });  
     res.render('view_candidats',{allCandidats, found});
     
    } catch (error) {
      res.status(500).send(error);
    }
  },
  find: async (req, res) => {
    try {
      const cin = req.params.cin;  
      const cin1 = req.params.cin1;  
      let candidat = await CandidatModel.findOne({ cin: cin });  
      let found = await UserModel.findOne({ cin: cin1 }); 
      if (!candidat) {
        return res.status(404).render('error', { message: 'Candidat non trouvé' });  
      }

      res.render('detailsCandidats', { candidat , found });
    } catch (error) {
      res.status(500).send(error);  
    }
  },


   create : async (req, res) => {
    try {
      const {
        cin,
        nbVote,
        nom,
        prenom,
        dateNais,
        address,
        email,
        motDePasse,
        PartPolytique,
        Experience,
        Biographie,
        PhotoURL,
        socialMedia,
        Programmes,
      } = req.body;
  
      if (!Programmes || !Array.isArray(Programmes)) {
        return res.status(400).json({
          message: "Les programmes électoraux doivent être fournis sous forme de tableau.",
        });
      }
  
      // Construire le nouveau candidat
      const newCandidat = new CandidatModel({
        cin,
        nbVote,
        nom,
        prenom,
        dateNais,
        address,
        email,
        motDePasse,
        PartPolytique,
        Experience,
        Biographie,
        PhotoURL,
        socialMedia,
        Programmes: Programmes.map((programme) => ({
          IdProgramme: programme.IdProgramme,
          titre: programme.titre,
          description: programme.description,
          actions: programme.actions.map((action) => ({
            IdAction: action.IdAction,
            titre: action.titre,
            description: action.description,
          })),
        })),
      });
  
      const savedCandidat = await newCandidat.save();
      res.json(savedCandidat);
    } catch (error) {
      console.error("Error saving candidate:", error);
      res
        .status(500)
        .json({ message: "Erreur interne du serveur", error: error.message });
    }
  }

 
};

export default CandidatController;
