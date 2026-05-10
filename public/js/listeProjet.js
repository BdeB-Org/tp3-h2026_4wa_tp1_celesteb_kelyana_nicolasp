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
                <td>${Projet.id_projet}</td>
                <td>${escapeHtml(Projet.titre)}</td>
                <td>${escapeHtml(Projet.description)}</td>
                <td>
                    <a class="btn-link" href="/editProjet.html?id=${Projet.id_projet}">Modifier</a>
                    <button class="danger" onclick="supprimerProjet(${Projet.id_projet})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const titre = document.getElementById('titre').value.trim();
//     const description = document.getElementById('description').value.trim();

//     try {
//         const res = await apiFetch('/api/Projet', {
//             method: 'POST',
//             body: JSON.stringify({ titre, description })
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.message || 'Erreur lors de l\'ajout');
//         }

//         form.reset();
//         showMessage('Projet ajouté avec succès');
//         chargerProjet();
//     } catch (err) {
//         showMessage(err.message, true);
// //     }
// });

async function supprimerProjet(Projet.id_projet) {
    if (!confirm('Voulez-vous vraiment supprimer ce Projet ?')) return;

    try {
        const res = await apiFetch('/api/Projet/' + Projet.id_projet, {
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