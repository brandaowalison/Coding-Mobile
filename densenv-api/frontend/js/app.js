document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:3000/api/filme/';
    let filmes = [];

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {
            console.log("Filmes recebidos:", data); // Debug
            filmes = data;
            displayFilmes(filmes);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));

    const searchInput = document.getElementById('search');  // Ajuste para corresponder ao HTML
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredFilmes = filmes.filter(filme => 
            filme.title.toLowerCase().includes(query)
        );
        displayFilmes(filteredFilmes);
    });

    function displayFilmes(filmes) {
        const moviesSection = document.getElementById('movies');  // Alterado para 'movies'
        if (!moviesSection) {
            console.error("Elemento #movies não encontrado no HTML!");
            return;
        }
        moviesSection.innerHTML = '';  // Limpa a lista de filmes antes de adicionar novos

        if (filmes.length === 0) {
            moviesSection.innerHTML = "<p>Nenhum filme encontrado.</p>";
            return;
        }

        const fragment = document.createDocumentFragment();

        filmes.forEach(filme => {
            const listItem = document.createElement('div');
            listItem.classList.add('movie-item'); // Adiciona uma classe para estilizar os filmes

            // Verifique se a propriedade posterUrl existe antes de exibir a imagem
            const poster = filme.posterUrl || 'https://via.placeholder.com/150'; // Imagem padrão, caso não haja poster
            const releaseDate = new Date(filme.releaseDate).toLocaleDateString(); // Formatação de data

            listItem.innerHTML = `
                <img src="${poster}" alt="${filme.title}">
                <h2>${filme.title}</h2>
                <p>${filme.description}</p>
                <div class="genre"><strong>Gênero:</strong> ${filme.genre}</div>
                <div class="release-date"><strong>Lançamento:</strong> ${releaseDate}</div>
            `;
            fragment.appendChild(listItem);
        });

        moviesSection.appendChild(fragment);  // Insere os filmes na seção
    }
});
