//Fait par Nicolas

requireAuth();

const tbody = document.getElementById('tbodyListeEleve');
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
                    <a class="btn-link" href="/editEleve.html?id_eleve=${Eleve.id_eleve}">Modifier</a>
                    <button class="danger" onclick="supprimerEleve(${Eleve.id_eleve})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

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