requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyProjet');
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

async function chargerProjet() {
    try {
        const res = await apiFetch('/api/Projet');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Projet => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Projet.id}</td>
                <td>${escapeHtml(Projet.Titre)}</td>
                <td>${escapeHtml(Projet.Description)}</td>
                <td>
                    <a class="btn-link" href="/editProjet.html?id=${Projet.id}">Modifier</a>
                    <button class="danger" onclick="supprimerProjet(${Projet.id})">Supprimer Projet</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titre = document.getElementById('Titre').value.trim();
    const description = document.getElementById('Description').value.trim();

    try {
        const res = await apiFetch('/api/Projet', {
            method: 'POST',
            body: JSON.stringify({ titre, description })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Étudiant ajouté avec succès');
        chargerProjet();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerProjet(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return;

    try {
        const res = await apiFetch('/api/Projet/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerProjet();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerProjet();