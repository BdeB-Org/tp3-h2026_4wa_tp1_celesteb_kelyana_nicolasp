// Fait par Nicolas
const db = require('../config/database.js');

//Opération Create->Select->GET
exports.getEleve = (req,res)=>{
 db.all('SELECT * FROM Eleve',(err,rows)=>{
    if (err) {
      console.error(err);
      return res.status(500).json({ erreur: err.message });
    }
  res.json(rows);
 });
};

exports.addEleve = (req,res)=>{
    const nom = req.body.nom;
    const prenom = req.body.prenom;

    if(!nom || !prenom){
        return res.status(400).json({
         message:"nom / prenom"
        })};

    console.log("Insertion:",nom,prenom);
    db.run(
        "INSERT INTO Eleve(nom,prenom) VALUES (?,?)",
        [nom,prenom],
        function(err){
            if(err){
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }
            res.json({
                message:"Étudiant ajouté",
                id:this.lastID
            });
        }
    );
};

exports.updateEleve = (req, res) => {

const id = req.params.id;
const { nom, prenom } = req.body;

    if(!nom || !prenom){
        return res.status(400).json({
         message:"nom et prénom "
        })};

db.run(
'UPDATE Eleve SET nom=?, prenom=? WHERE id_eleve=?',
[nom, prenom, id],
function(err){

if(err){
return res.status(500).json({ erreur: err.message });
}

res.json({
message: "Étudiant modifié",
id: id
});
});
};



exports.deleteEleve = (req, res) => {

const id = req.params.id;

// Vérifier que l'id est fourni​
if (!id) {
return res.status(400).json({ message: "ID manquant" });
}

// Exécuter la requête SQL avec callback​
db.run(
'DELETE FROM Eleve WHERE id_eleve = ?',
[id],
function(err) {
if (err) {
console.error(err);
return res.status(500).json({ erreur: err.message });
}

// Vérifier si une ligne a été supprimée​
if (this.changes === 0) {
return res.status(404).json({ message: "Aucun étudiant trouvé avec cet ID" });
}

res.json({ message: "Étudiant supprimé", id: id });
}
);

};