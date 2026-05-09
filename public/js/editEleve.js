requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerEleve() {
    try {
        const res = await apiFetch('/api/Eleve/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('prenom').value = data.prenom;
        document.getElementById('nom').value = data.nom;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('prenom').value.trim();
    const programme = document.getElementById('nom').value.trim();

    try {
        const res = await apiFetch('/api/Eleve/' + id, {
            method: 'PUT',
            body: JSON.stringify({ prenom, nom })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listEleve.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID étudiant manquant', true);
} else {
    chargerEleve();
}

