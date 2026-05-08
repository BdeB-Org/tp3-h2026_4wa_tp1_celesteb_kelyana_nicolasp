requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyEleves');
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

async function chargerEleve() {
    try {
        const res = await apiFetch('/api/Eleve');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Eleve => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Eleve.id_eleve}</td>
                <td>${escapeHtml(Eleve.prenom)}</td>
                <td>${escapeHtml(Eleve.nom)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id_eleve=${Eleve.id_eleve}">Modifier</a>
                    <button class="danger" onclick="supprimerEleve(${Eleve.id_eleve})">Supprimer</button>
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

    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();

    try {
        const res = await apiFetch('/api/Eleve', {
            method: 'POST',
            body: JSON.stringify({ prenom, nom })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Étudiant ajouté avec succès');
        chargerEleve();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerEleve(id_eleve) {
    if (!confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return;

    try {
        const res = await apiFetch('/api/Eleve/' + id_eleve, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerEleve();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerEleve();