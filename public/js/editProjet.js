requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerProjet() {
    try {
        const res = await apiFetch('/api/Projet/' + id);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }
        document.getElementById('titre').value = data.titre;
        document.getElementById('description').value = data.description;
        document.getElementById('date').value = data.date_creation;
        document.getElementById('id_eleve').value = data.id_eleve;
        document.getElementById('id_type').value = data.id_type;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const date_creation = document.getElementById('date').value;
    const id_eleve = document.getElementById('id_eleve').value;
    const id_type = document.getElementById('id_type').value;
    try {
        const res = await apiFetch('/api/Projet/' + id, {
            method: 'PUT',
            body: JSON.stringify({ titre, description, date_creation, id_eleve, id_type })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }
        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listProjet.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID Projet manquant', true);
} else {
    chargerProjet();
}