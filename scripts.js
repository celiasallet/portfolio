document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("article-container");

  const articles = ['article3.yml',,'article4.yml']; //  , 'article3.yml', 'article4.yml' Corrige la répétition

 
  function loadYAMLFile(yamlFile) {
    // Charger le fichier YAML
    fetch(`./assets/${yamlFile}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fichier YAML non trouvé");
        }
        return response.text();
      })
      .then((yamlText) => {
    
        const data = jsyaml.load(yamlText);
        
        const firstImage = data.images && data.images.length > 0 ? data.images[0] : ''; 

        if (!firstImage) {
          throw new Error("Aucune image trouvée pour l'article : " + yamlFile);
        }

        const articleHTML = `
          <article class="article">
            <img class="home" src="./assets/img/${firstImage}" alt="${data.title}">
          </article>
        `;

        container.innerHTML += articleHTML;
      })
      .catch((error) => {
        console.error(error);
        container.innerHTML += `<p>${error.message}</p>`;
      });
  }

  articles.forEach((article) => loadYAMLFile(article));
});

