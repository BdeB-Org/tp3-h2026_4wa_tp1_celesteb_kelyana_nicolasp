requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id_image');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerImage() {
    try {
        const res = await apiFetch('/api/ImageProjet/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('id_eleve').value = data.id_eleve;
        document.getElementById('chemin_image').value = data.chemin_image;
        document.getElementById('id_projet').value = data.id_projet;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eleve = document.getElementById('id_eleve').value.trim();
    const image = document.getElementById('chemin_image').value.trim();
    const projet = document.getElementById('id_projet').value.trim();

    try {
        const res = await apiFetch('/api/ImageProjet/' + id, {
            method: 'PUT',
            body: JSON.stringify({ image, projet, eleve })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listImage.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID étudiant manquant', true);
} else {
    chargerImage();
}
