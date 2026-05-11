requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function choisirTypeProjet() {
    try {
        const res = await apiFetch('/api/TypeProjet/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('id_type').value = data.id_type;
        document.getElementById('nom_type').value = data.nom_type;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom_type').value.trim();

    try {
        const res = await apiFetch('/api/TypeProjet/' + id, {
            method: 'PUT',
            body: JSON.stringify({ nom_type: nom })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listTypeProjet.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID type de projet manquant', true);
} else {
    choisirTypeProjet();
}
