class LoadPicture {
  /**
   * Constructeur de la classe LoadPicture
   * @param {params} params  Les différents paramètres du constructeur ligne par ligne
   */
  constructor(params) {
    /**
     * @var {string}  apiUrl URL de l'API
     */
    this.apiUrl = params.apiUrl || 'https://jsonplaceholder.typicode.com/photos';
    /**
     * @var {element}  imageContainer div de l'HTML où seront affichés les images
     */
    this.imageContainer = document.querySelector(params.imageContainer) || document.body;
    /**
     * @var {string} imageContainer.id ID pour modifier style CSS
     */
    this.imageContainer.id = "image-container"
    /**
     * @var {number}  imagesPerBatch Nombre d'images renvoyées de l'API
     */
    this.imagesPerBatch = params.imagesPerBatch || 10;
    /**
     * @var {string}  sortOrder Ordre du renvoi des images - DESC pour décroissant
     */
    this.sortOrder = params.sortOrder || 'ASC';
    /**
     * @var {number} currentBatch Groupe d'images actuel
     */
    this.currentBatch = 1;
    /**
     * @var {array} images Initialise un tableau pour stocker les images
     */
    this.images = [];
    
    // Appelle la méthode loadImages
    this.loadImages();
    // Appelle la méthode nextButton
    //this.nextButton(); 
  }

  /**
   * Methode asyncrone pour charger les images de l'API, les stocker dans
   * this.images, appelle la méthode displayImages
   */
  async loadImages() {
    try {
      const loadedImages = await fetch(this.apiUrl);
  
      if (!loadedImages.ok) {
        throw new Error(`Impossible de charger les images via ${this.apiUrl}`);
      }
      this.images = await loadedImages.json();
      this.displayImages();
    } catch (e) {
      console.log('Une erreur est survenue ' + e);
    }
  }

/**
 * Affiche le groupe d'images instanciées
 */
  displayImages() {
    // Création d'un index de début et de fin d'affichage d'images
    const startIndex = (this.currentBatch - 1) * this.imagesPerBatch;
    const endIndex = startIndex + this.imagesPerBatch;
    const batch = this.images.slice(startIndex, endIndex);

    // Création des conteneurs pour images 
    batch.forEach((urlImage) => {
      const imageElement = document.createElement('img');
      imageElement.src = urlImage.url;
      imageElement.alt = `${urlImage.id}`;
      this.imageContainer.appendChild(imageElement);
    });

    // Si il reste des images à renvoyer, 
    // crée un bouton Next pour renvoyer d'autres images
    if (endIndex < this.images.length) {
      this.nextButton(); 
    }
  }

  /**
   * Crée le bouton Next pour passer à la prochaine série
   * d'images
   */
  nextButton() {
    this.buttonNext = document.createElement("button");
    // attribution d'un id pour modifier dans le CSS
    this.buttonNext.id = "buttonNext";
    this.buttonNext.textContent = "Next";
    this.imageContainer.appendChild(this.buttonNext);
    // Appelle la méthode next quand il y a un clique dessus
    this.buttonNext.addEventListener("click", () => {
      this.next();
    });
  }

  /**
   * Affiche la prochaine série d'images
   */
  next() {
    // Efface les précédentes images
    // A decommenter pour stocker plusieurs groupes d'img
    this.imageContainer.innerHTML = ''; 
    // Incrementre le groupe d'images actuel pour aller au prochain
    this.currentBatch++;
    // Appelle displayImages pour afficher le nouveau groupe d'img
    this.displayImages(); 
    // Affiche l'icone de chargement et le masque quand les img sont chargées
    // A Corriger, pas trouvé de méthode pour convenablement l'afficher
    document.getElementById("loader").style.display = "block";
    document.getElementById("loader").style.display = "none";
  }
}

new LoadPicture({});

