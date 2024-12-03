import CandidatModel from "../Models/Candidat.js";
import UserModel from "../Models/User.js"; // Ensure this imports the correct Mongoose model

const CandidatController = { 
  all: async (req, res) => {
    try {
      const partie = req.query.partie || ''; // Récupérer la partie à partir des paramètres de requête
      let allCandidats = [];

      if (partie) {
        allCandidats = await CandidatModel.find({ PartPolytique: partie }).populate('FavorisésPar');
      } else {
        allCandidats = await CandidatModel.find().populate('FavorisésPar');
      }

      // just pour le moment, récupérer l'utilisateur avec le CIN
      const cin = req.params.cin; 
      let found = await UserModel.findOne({ cin: cin }); 

      // Renvoyer la vue avec les candidats filtrés et l'utilisateur trouvé
      res.render('view_candidats', { allCandidats, found });
    } catch (error) {
      res.status(500).send(error);
    }
  },


  
  voteCandidate : async (req, res) => {
    try{
    const { candidatId, userId } = req.body;
    const candidat = await CandidatModel.findById(candidatId);
    const user = await UserModel.findById(userId);
    if (!candidat || !user) {
      return res.status(404).json({ message: 'Candidat or User not found' });
    }
    
    candidat.usersVotés.push(userId);
    user.ElectionCandidat=candidatId;
    await Promise.all([candidat.save(), user.save()]);
    res.redirect(`/DetailsCandidats/${candidat.cin}/ForUser/${user.cin}`);
    } catch (error) {
      res.status(500).json({ message: 'Error updating voting status', error });
    }
  },
  toggleFavorite : async (req, res) => {
    try {
      const { candidatId, userId } = req.body;
  
      // Find the candidate and user in the database
      const candidat = await CandidatModel.findById(candidatId);
      const user = await UserModel.findById(userId);
  
      if (!candidat || !user) {
        return res.status(404).json({ message: 'Candidat or User not found' });
      }
  
      // Toggle the favorite status in Candidat
      if (candidat.FavorisésPar.includes(userId)) {
        // Remove the user from the favorites list in Candidat
        candidat.FavorisésPar.pull(userId);
      } else {
        // Add the user to the favorites list in Candidat
        candidat.FavorisésPar.push(userId);
      }
  
      // Toggle the favorite status in User
      if (user.CandidatsFavoris.includes(candidatId)) {
        // Remove the candidate from the favorites list in User
        user.CandidatsFavoris.pull(candidatId);
      } else {
        // Add the candidate to the favorites list in User
        user.CandidatsFavoris.push(candidatId);
      }
  
      // Save both the updated Candidat and User documents
      await Promise.all([candidat.save(), user.save()]);
  
      res.redirect(`/DetailsCandidats/${candidat.cin}/ForUser/${user.cin}`);
    } catch (error) {
      res.status(500).json({ message: 'Error updating favorite status', error });
    }
    },
  favorites: async (req, res) => {
    try {
      const cin = req.params.cin; // Get user's CIN from request parameters
  
      // Find the user by CIN and populate the favorites populate is very important
      let found = await UserModel.findOne({ cin: cin }).populate('CandidatsFavoris');
  
      if (!found) {
        return res.status(404).send('User not found');
      }
  
      // Pass only the favorites to the view
      const favoriteCandidats = found.CandidatsFavoris;
  
      res.render('view_candidats', { allCandidats:favoriteCandidats, found});
    } catch (error) {
      res.status(500).send(error);
    }
  },
 
  searchCandidate : async (req, res) => {
    try {
      const { name, cinUser, parti } = req.query; // Extract search term and user CIN from query
  
      // Split the name into two parts (nom and prenom) using space as the delimiter
      const nameParts = name.split(' ');
  
      let nom = nameParts[0]; // The first part is the 'nom'
      let prenom = nameParts[1] || ''; // The second part, if available, is the 'prenom'
  
      // Build the search query based on the availability of 'nom' and 'prenom'
      const query = {
        $or: []
      };
  
      if (nom) {
        // Search for 'nom' if it's provided
        query.$or.push({ nom: { $regex: new RegExp(`^${nom}$`, 'i') } });
      }
  
      if (prenom) {
        // Search for 'prenom' if it's provided
        query.$or.push({ prenom: { $regex: new RegExp(`^${prenom}$`, 'i') } });
      }
  
      // If neither 'nom' nor 'prenom' is provided, return an error
      if (query.$or.length === 0) {
        return res.status(400).render('error', { message: 'Please enter a name to search for.' });
      }
  
      // Search for a candidate based on the constructed query
      const candidate = await CandidatModel.findOne(query); 
  
      if (!candidate) {
        // If no candidate is found, return an error
        return res.status(404).render('error', { message: 'Candidate not found!' });
      }
  
      // Redirect to the candidate's details page
      res.redirect(`/DetailsCandidats/${candidate.cin}/ForUser/${cinUser}`);
   


    } catch (error) {
      console.error('Error searching for candidate by name:', error);
      res.status(500).render('error', { message: 'An error occurred during the search.' });
    }
  },
  
  
  find: async (req, res) => {
    try {
      const cin = req.params.cin;  
      const cin1 = req.params.cin1;  
      let candidat = await CandidatModel.findOne({ cin: cin }).populate({
        path: 'Comments',
        populate: {
          path: 'user', // Populate the `user` field inside each comment
          select: 'nom prenom', // Fetch only the user's name and surname
        },
      });
      let found = await UserModel.findOne({ cin: cin1 }); 
      if (!candidat) {
        return res.status(404).render('error', { message: 'Candidat non trouvé' });  
      }
      res.render('detailsCandidats', { candidat , found });
    } catch (error) {
      res.status(500).send(error);  
    }
  },

  AllPartiesPolytiques: async (req, res) => {
    try {
      const parties = await CandidatModel.distinct("PartPolytique");
      console.log('Parties récupérées:', parties); 
      res.status(200).json(parties); 
    } catch (error) {
      console.error('Erreur lors de la récupération des parties politiques:', error);
      res.status(500).json({ error: "Erreur lors de la récupération des parties politiques" });
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
