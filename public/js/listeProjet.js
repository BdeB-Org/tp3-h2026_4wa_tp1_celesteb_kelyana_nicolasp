requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyEtudiants');
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
        const res = await apiFetch('/api/Projet');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Projet => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${etudiant.id}</td>
                <td>${escapeHtml(Projet.titre)}</td>
                <td>${escapeHtml(Projet.description)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${Projet.id}">Modifier</a>
                    <button class="danger" onclick="supprimerEtudiant(${Projet.id})">Supprimer</button>
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
//         chargerEtudiants();
//     } catch (err) {
//         showMessage(err.message, true);
// //     }
// });

async function supprimerProjet(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet Projet ?')) return;

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