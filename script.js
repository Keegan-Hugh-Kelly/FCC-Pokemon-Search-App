document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Use the PokéAPI Proxy URL for fetching Pokémon data
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
        .then(response => {
            if (!response.ok) {
                alert('Pokémon not found');
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            // Populate Pokémon data
            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-id').textContent = `#${data.id}`;
            document.getElementById('weight').textContent = data.weight;
            document.getElementById('height').textContent = data.height;

            // Stats
            const stats = {};
            data.stats.forEach(stat => {
                stats[stat.stat.name] = stat.base_stat;
            });

            document.getElementById('hp').textContent = stats.hp;
            document.getElementById('attack').textContent = stats.attack;
            document.getElementById('defense').textContent = stats.defense;
            document.getElementById('special-attack').textContent = stats['special-attack'];
            document.getElementById('special-defense').textContent = stats['special-defense'];
            document.getElementById('speed').textContent = stats.speed;

            // Types
            const typesElement = document.getElementById('types');
            typesElement.innerHTML = '';
            
            // Define type colors for dynamic background change
            const typeColors = {
                electric: '#FFEA00',
                water: '#2196F3',
                fire: '#FF5722',
                grass: '#4CAF50',
                ghost: '#7B62A3',
                poison: '#A040A0',
                ground: '#E0C068',
                flying: '#A890F0',
                psychic: '#F85888',
                ice: '#98D8D8',
                dragon: '#7038F8',
                dark: '#705848',
                steel: '#B8B8D0',
                fairy: '#EE99AC',
                bug: '#A8B820',
                rock: '#B8A038',
                fighting: '#C03028',
                normal: '#A8A878'
            };

            // Set card background to the first Pokémon type
            const pokemonCard = document.getElementById('pokemon-card');
            const primaryType = data.types[0].type.name; // Using the first type as the primary
            pokemonCard.style.backgroundColor = typeColors[primaryType] || 'lightgray'; // Fallback to lightgray

            // Add type badges
            data.types.forEach(type => {
                const typeElement = document.createElement('div');
                typeElement.textContent = type.type.name.toUpperCase();
                typeElement.style.backgroundColor = typeColors[type.type.name];
                typeElement.style.color = 'white';  // For readability
                typeElement.style.padding = '5px';
                typeElement.style.borderRadius = '5px';
                typeElement.style.display = 'inline-block';
                typeElement.style.margin = '3px';
                typesElement.appendChild(typeElement);
            });

            // Pokémon image
            const spriteElement = document.getElementById('sprite');
            spriteElement.src = data.sprites.front_default;
            spriteElement.style.display = 'block';
        })
        .catch(error => {
            console.error(error);
        });
});
