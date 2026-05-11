// Fait par Kelyan
const db = require('../config/database.js');

//Opération Create->Select->GET
exports.getProjet = (req,res)=>{
 db.all('SELECT * FROM Projet',(err,rows)=>{
  res.json(rows);
 });
};

exports.getProjetById = (req,res)=>{
 const id = req.params.id;
 db.get(
  'SELECT * FROM Projet WHERE id_projet=?',
  [id],
  (err,row)=>{
   if(err){
    return res.status(500).json({
     message:"Erreur serveur"
    }); }
   if(!row){
    return res.status(404).json({
     message:"Projet non trouvé"  }); }
   res.json(row);});};

exports.addProjet = (req, res) => {
    const titre = req.body.titre;
    const description = req.body.description;
    const date_creation = req.body.date_creation;
    const id_eleve = req.body.id_eleve;
    const id_type = req.body.id_type;

    if (!titre || !description || !date_creation || !id_eleve || !id_type) {
        return res.status(400).json({
            message: "titre, description, date_creation, id_eleve et id_type requis!"
        });
    }

    db.run(
        "INSERT INTO Projet(titre, description, date_creation, id_eleve, id_type) VALUES (?,?,?,?,?)",
        [titre, description, date_creation, id_eleve, id_type],
        function (err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }
            res.json({ message: "Projet ajouté", id: this.lastID });
        }
    );
};





exports.deleteProjet = (req, res) => {

const id = req.params.id;

// Vérifier que l'id est fourni​
if (!id) {
return res.status(400).json({ message: "ID manquant" });
}

// Exécuter la requête SQL avec callback​
db.run(
'DELETE FROM Projet WHERE id_projet = ?',
[id],
function(err) {
if (err) {
console.error(err);
return res.status(500).json({ erreur: err.message });
}

// Vérifier si une ligne a été supprimée​
if (this.changes === 0) {
return res.status(404).json({ message: "Aucun projet trouvé avec cet ID" });
}

res.json({ message: "Projet supprimé", id: id });
}
);

};


exports.updateProjet = (req, res) => {
    const id = req.params.id;
    const { titre, description, date_creation, id_eleve, id_type } = req.body;

    if (!titre || !description || !date_creation || !id_eleve || !id_type) { 
        return res.status(400).json({
            message: "titre, description, date_creation, id_eleve et id_type requis"
        });
    }

    db.run(
        'UPDATE Projet SET titre=?, description=?, date_creation=?, id_eleve=?, id_type=? WHERE id_projet=?',
        [titre, description, date_creation, id_eleve, id_type, id],
        function (err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }
            res.json({ message: "Projet modifié", id: id });
        }
    );
};



