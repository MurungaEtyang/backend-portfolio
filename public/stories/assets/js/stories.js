const articlesData = [
    {
        id: 1,
        title: 'Title 1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        smallDescription: 'Description 1',
        description: {
            author: "Evans Murunga",
            date: "2022-01-01",
            description: 'This is the description',
            tags: 'tag1, tag2'
        }
    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'Article 2',
        smallDescription: 'This is article 2',
        fullDetails: {
            author: 'Jane Doe',
            date: '2022-01-15',
            description: 'This is the full description of article 2This is the full description of article 2',
            tags: ['tag3', 'tag4']
        }
    }
];

function Articles(articles) {
    this.articles = articles.map(article => {
        return {
            id: article.id,
            image: article.image,
            title: article.title.replace(/-/g, ' - '),
            smallDescription: article.smallDescription,
            fullDetails: article.description || article.fullDetails // Handles both formats
        };
    });
}

const articles = new Articles(articlesData);
const articlesList = document.getElementById('articles-list');

function renderArticlesList() {
    articlesList.innerHTML = ''; // Clear the container
    articles.articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'col-12';
        articleElement.innerHTML = `
            <div class="row border rounded p-3 align-items-center" onclick="showFullArticle(${article.id})" style="cursor: pointer;">
                
                <div class="col-md-4">
                    <img src="${article.image}" alt="${article.title}" class="img-fluid rounded">
                </div>
                <div class="col-md-8">
                    <p class="text-muted small mb-1">${Array.isArray(article.fullDetails.tags) ? article.fullDetails.tags.join(', ') : article.fullDetails.tags}</p>
                    <h3 class="mb-2">${article.title}</h3>
                    <p>${article.smallDescription}</p>
                </div>
            </div>
        `;
        articlesList.appendChild(articleElement);
    });
}

function showFullArticle(id) {
    const article = articles.articles.find(article => article.id === id);
    if (!article) return;

    document.title = article.title.split(' ').length > 2
        ? article.title.split(' ').join(' - ')
        : article.title;

    articlesList.innerHTML = `
        <div class="row g-4">
           
            <div class="col-12">
                <div class="card p-4 shadow-sm">
                    <div class="col-12 text-center">
                        <img src="${article.image}" alt="${article.title}" class="img-fluid rounded mb-4" style="max-height: 500px; object-fit: cover;">
                    </div>
                    <p class="small text-primary text-right">
                        ${Array.isArray(article.fullDetails.tags) ? article.fullDetails.tags.join(', ') : article.fullDetails.tags}
                    </p>
                    <h2 class="mb-3 text-center">${article.title}</h2>
                    <p class="text-muted small text-center">Author: ${article.fullDetails.author}</p>
                    <p class="text-muted small text-center">Date: ${article.fullDetails.date}</p>
                    <p class="mb-3 text-left">${article.fullDetails.description}</p>
                    <button class="btn btn-secondary mt-3" onclick="renderArticlesList()">Back to Articles</button>
                </div>
            </div>
        </div>
    `;
}


renderArticlesList();