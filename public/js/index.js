
        const form = document.getElementById('loginForm');
        const message = document.getElementById('message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            message.innerHTML = '';

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Erreur de connexion');
                }

                saveToken(data.token);
                window.location.href = '/index.html';
            } catch (err) {
                message.innerHTML = '<div class="message error">' + err.message + '</div>';
            }
        });
    