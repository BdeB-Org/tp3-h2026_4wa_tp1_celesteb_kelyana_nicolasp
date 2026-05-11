// Fait par Céleste B.
const db = require('../config/database.js');


exports.getTypeProjet = (req, res) => {
    db.all('SELECT * FROM TypeProjet', (err, rows) => {
        if (err) {
            return res.status(500).json({ erreur: err.message });
        }
        res.json(rows);
    });
};

exports.getTypeProjetById = (req,res)=>{
 const id = req.params.id;
 db.get(
  'SELECT * FROM TypeProjet WHERE id_type=?',
  [id],
  (err,row)=>{
   if(err){
    return res.status(500).json({
     message:"Erreur serveur"
    }); }
   if(!row){
    return res.status(404).json({
     message:"Type de projet non trouvé"  }); }
   res.json(row);});};

exports.addTypeProjet = (req, res) => {
    const type = req.body.nom_type;
    const id_eleve = req.body.id_eleve;

    if (!type || !id_eleve) {
        return res.status(400).json({
            message: "nom_type et id_eleve sont requis"
        });
    }

    console.log("Insertion:", type, id_eleve);

    db.run(
        "INSERT INTO TypeProjet(nom_type) VALUES (?)",
        [type],
        function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "Type de projet ajouté",
                id: this.lastID
            });
        }
    );
};

exports.updateTypeProjet = (req, res) => {
    const id = req.params.id;
    const { nom_type } = req.body;

    if (!nom_type) {
        return res.status(400).json({
            message: "nom_type est requis"
        });
    }

    db.run(
        'UPDATE TypeProjet SET nom_type = ? WHERE id_type = ?',
        [nom_type, id],
        function (err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun type de projet trouvé avec cet ID" });
            }
            res.json({
                message: "Type de projet modifié",
                id: id
            });
        }
    );
};

exports.deleteTypeProjet = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }

    db.run(
        'DELETE FROM TypeProjet WHERE id_type = ?',
        [id],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun type de projet trouvé avec cet ID" });
            }
            res.json({ message: "Type de projet supprimé", id: id });
        }
    );
};