document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("carousel");

    const articles = ['article1.yml', 'article2.yml', 'article3.yml', 'article4.yml', 'article6.yml', 'article7.yml', 'article8.yml', 'article9.yml', 'article10.yml', 'article11.yml', 'article12.yml'];
// classer par dates dans le fichier par année
    function loadYAMLFile(yamlFile) {
        return fetch(`./assets/${yamlFile}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fichier YAML non trouvé");
                }
                return response.text();
            })
            .then((yamlText) => {
                return jsyaml.load(yamlText);
            })
            .catch((error) => {
                console.error('Erreur de chargement du fichier YAML:', error);
                return [];
            });
    }

    function displayArticles(articlesData) {
        // Sort articles by date, from most recent to oldest
        articlesData.sort((a, b) => {
            return parseInt(b.date) - parseInt(a.date); // Assuming date is a string
        });

        container.innerHTML = ''; 

        articlesData.forEach(data => {
            const firstImage = data.images ? data.images[0] : ''; 

            const articleHTML = `
                <div class="layout">
                    <a href="soloprojet.html?title=${encodeURIComponent(data.title)}&images=${encodeURIComponent(JSON.stringify(data.images))}&type=${encodeURIComponent(data.type)}&date=${encodeURIComponent(data.date)}&description=${encodeURIComponent(data.description || '')}">
                        <div class="boximg">
                            <img class="carouimg" src="./assets/img/${firstImage}" alt="${data.title}">
                        </div>
                        <div class="nextflex">
                            <div class="leftflex">
                                <h3>${data.title}</h3>
                                <h4 class="type">${data.type}</h4>
                                <h6 class="date">${data.date}</h6>
                            </div>
                            <div class="rightflex">
                                <img src="assets/icones/droit.png" alt="scroll left">
                            </div>
                        </div>
                    </a>
                </div>
            `;
            container.innerHTML += articleHTML;
        });
    }

    async function loadAllArticles(files) {
        const articlePromises = files.map(file => loadYAMLFile(file));
        const allArticles = await Promise.all(articlePromises);
        return allArticles.flat(); 
    }

    loadAllArticles(articles).then(displayArticles);
});
