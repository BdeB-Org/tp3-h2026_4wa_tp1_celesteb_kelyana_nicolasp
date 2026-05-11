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
        const res = await apiFetch('/api/Image/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('image').value = data.image;
        document.getElementById('id_numero_projet').value = data.projet;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const image = document.getElementById('image').value.trim();
    const projet = document.getElementById('projet').value.trim();

    try {
        const res = await apiFetch('/api/Image/' + id, {
            method: 'PUT',
            body: JSON.stringify({ image, projet })
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
