requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyListeTypeProjet');
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

async function choisirTypeProjets() {
    try {
        const res = await apiFetch('/api/TypeProjet');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(typeProjet => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${typeProjet.id_type}</td>
                <td>${escapeHtml(typeProjet.nom_type)}</td>
                <td>
                    <a class="btn-link" href="/editTypeProjet.html?id=${typeProjet.id_type}">Modifier</a>
                    <button class="danger" onclick="supprimerTypeProjet(${typeProjet.id_type})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerTypeProjet(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce type de projet ?')) return;

    try {
        const res = await apiFetch('/api/TypeProjet/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        choisirTypeProjets();
    } catch (err) {
        showMessage(err.message, true);
    }
}

choisirTypeProjets();