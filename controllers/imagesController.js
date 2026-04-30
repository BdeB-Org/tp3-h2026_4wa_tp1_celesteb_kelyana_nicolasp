const db = require('../config/database.js');

exports.getImages = (req, res) => {
  db.all('SELECT * FROM ImageProjet', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erreur: err.message });
    }
    res.json(rows);
  });
};

exports.addImages = (req, res) => {
    const chemin_image = req.body.chemin_image;
    const id_projet = req.body.id_projet;
    if (!chemin_image || !id_projet) {
        return res.status(400).json({ message: "chemin_image et id_projet sont requis" });
    }
    db.run(
        "INSERT INTO ImageProjet(chemin_image, id_projet) VALUES (?, ?)",
        [chemin_image, id_projet],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "Image ajoutée",
                id: this.lastID
            });
        }
    );
};

exports.updateImages = (req, res) => {
    const id = req.params.id;
    const chemin_image = req.body.chemin_image;
    const id_projet = req.body.id_projet;
    if (!chemin_image || !id_projet) {
        return res.status(400).json({ message: "chemin_image et id_projet sont requis" });
    }
    db.run(
        "UPDATE ImageProjet SET chemin_image = ?, id_projet = ? WHERE id_image = ?",
        [chemin_image, id_projet, id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucune image trouvée avec cet ID" });
            }
            res.json({
                message: "Image mise à jour",
                id: id
            });
        }
    );
};

exports.deleteImages = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run(
        'DELETE FROM ImageProjet WHERE id_image = ?',
        [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucune image trouvée avec cet ID" });
            }
            res.json({ message: "Image supprimée", id: id });
        }
    );
};