requireAuth();

const tbody = document.getElementById('tbodyListeImages');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerEtudiants() {
    try {
        const res = await apiFetch('/api/ImageProjet');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Image => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Image.id_image}</td>
                <td>${escapeHtml(Image.image)}</td>
                <td>${escapeHtml(Image.id_numero_projet)}</td>
                <td>
                    <a class="btn-link" href="/editImage.html?id=${Image.id_image}">Modifier</a>
                    <button class="danger" onclick="supprimerImage(${Image.id_image})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerImage(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet image ?')) return;

    try {
        const res = await apiFetch('/api/ImageProjet/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerImage();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerImage();