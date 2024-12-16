const topStory = {
    id: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
    title: 'The Future of Artificial Intelligence',
    likes: 1400,
    explanation: 'Artificial Intelligence has come a long way...',
    description: {
        author: 'Evans Murunga',
        date: '2022-01-01',
        description: 'Full information about AI advancements.',
        tags: 'technology'
    },
    publishedAt: '2022-01-01T12:10:00Z'
};

const articlesData = [
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'The Future of Artificial Intelligence',
        likes: 1400,
        explanation: 'Artificial Intelligence has come a long way...',
        description: {
            author: 'Evans Murunga',
            date: '2022-01-01',
            description: 'Full information about AI advancements.',
            tags: 'technology'
        },
        publishedAt: '2022-01-01T12:10:00Z'
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'The Future of Artificial Intelligence',
        likes: 1400,
        explanation: 'Artificial Intelligence has come a long way...',
        description: {
            author: 'Evans Murunga',
            date: '2022-01-01',
            description: 'Full information about AI advancements.',
            tags: 'technology'
        },
        publishedAt: '2022-01-01T12:10:00Z'
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'The Future of Artificial Intelligence',
        likes: 1400,
        explanation: 'Artificial Intelligence has come a long way...',
        description: {
            author: 'Evans Murunga',
            date: '2022-01-01',
            description: 'Full information about AI advancements.',
            tags: 'technology'
        },
        publishedAt: '2022-01-01T12:10:00Z'
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'The Future of Artificial Intelligence',
        likes: 1400,
        explanation: 'Artificial Intelligence has come a long way...',
        description: {
            author: 'Evans Murunga',
            date: '2022-01-01',
            description: 'Full information about AI advancements.',
            tags: 'technology'
        },
        publishedAt: '2022-01-01T12:10:00Z'
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'The Future of Artificial Intelligence',
        likes: 1400,
        explanation: 'Artificial Intelligence has come a long way...',
        description: {
            author: 'Evans Murunga',
            date: '2022-01-01',
            description: 'Full information about AI advancements.',
            tags: 'technology'
        },
        publishedAt: '2022-01-01T12:10:00Z'
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatclass="col-lg-4" id="trendic.com/images?q=tbn:ANd9GcSz1wzkFjgREGO_Eeru8x7J0hZb1NBaYDSoew&s',
        title: 'The Future of Artificial Intelligence',
        likes: 1400,
        explanation: 'Artificial Intelligence has come a long way...',
        description: {
            author: 'Evans Murunga',
            date: '2022-01-01',
            description: 'Full information about AI advancements.',
            tags: 'technology'
        },
        publishedAt: '2022-01-01T12:10:00Z'
    }
];

const trendingStories = articlesData.sort((a, b) => b.likes - a.likes).slice(0, 8);

class Articles {
    constructor(articles) {
        this.articles = articles.map(article => {
            return {
                id: article.id,
                image: article.image,
                title: article.title,
                smallDescription: article.explanation,
                fullDetails: {
                    author: article.description.author,
                    date: article.description.date,
                    description: article.description.description,
                    tags: article.description.tags
                },
                likes: article.likes
            }
        });
    }
}

function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    const intervals = [
        { label: 'second', seconds: 60 },
        { label: 'minute', seconds: 3600 },
        { label: 'hour', seconds: 86400 },
        { label: 'day', seconds: 2592000 },
        { label: 'month', seconds: 31536000 }
    ];

    for (const interval of intervals) {
        const intervalValue = Math.floor(seconds / interval.seconds);
        if (intervalValue >= 1) {
            return `${intervalValue} ${interval.label}${intervalValue > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}

const articles = new Articles(articlesData);
const articlesList = document.getElementById('articles-list');

function showNotification(action, title) {
    alert(`${action} clicked for: ${title}`);
}

function renderTopStory() {
    const topStoryElement = document.getElementById('top-story');
    topStoryElement.innerHTML = `
        <div class="card border border-primary">
            <img src="${topStory.image}" class="card-img-top" alt="${topStory.title}">
            <div class="card-body">
                <h5 class="card-title">${topStory.title}</h5>
                <p class="card-text">${topStory.description.description}</p>
                <p class="text-muted">By ${topStory.description.author}, ${topStory.description.date}</p>
                <button onclick="showNotification('Like', '${topStory.title}')" class="btn btn-light">
                    <img src="/home/assests/img/like-solid.svg" width="20" height="20" alt="Share">
                </button>
                <button onclick="showNotification('Share', '${topStory.title}')" class="btn btn-light">
                    <img src="/home/assests/img/share-solid.svg" width="20" height="20" alt="Share">
                </button>
            </div>
        </div>
    `;
}

function renderTrendingStories() {
    const trendingStoriesElement = document.getElementById('trending-stories');
    trendingStoriesElement.innerHTML = `
        <div class="card border border-secondary">
            <div class="card-body">
                <h5 class="card-title">Trending Stories</h5>
                ${trendingStories.map(story => `
                    <div class="d-flex align-items-start mb-3">
                        <img src="${story.image}" class="rounded me-3 border border-secondary" alt="${story.title}" style="width: 50px; height: 50px;">
                        <p class="mb-0 text-dark">${story.title} <span class="badge bg-secondary">${story.likes}</span></p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

let articlesToShow = 5;
function renderArticles() {
    articlesList.innerHTML = '';
    const articlesToRender = articles.articles.slice(0, articlesToShow);
    articlesToRender.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'col-12 mb-3';
        articleElement.innerHTML = `
            <div class="row border rounded p-3 align-items-center" onclick="showFullArticle(${article.id})" style="cursor: pointer;">
                <div class="col-md-4">
                    <img src="${article.image}" alt="${article.title}" class="img-fluid rounded">
                </div>
                <div class="col-md-8">
                    <p class="text-muted small mb-1">${timeAgo(article.publishedAt)}</p>
                    <p class="text-muted small mb-1">${Array.isArray(article.fullDetails.tags) ? article.fullDetails.tags.join(', ') : article.fullDetails.tags}</p>
                    <h3 class="mb-2">${article.title}</h3>
                    <p>${article.smallDescription}</p>
                    <button class="text-muted small">
                    <img src="/home/assests/img/like-solid.svg" width="20" height="20" alt="Share"> ${article.likes}</button>
                </div>
            </div>
        `;
        articlesList.appendChild(articleElement);
    });

    const articlesLength = articles.articles.length;
    if (articlesLength > articlesToShow) {
        const showMoreButton = document.createElement('div');
        showMoreButton.className = 'col-12 text-center mt-3';
        showMoreButton.innerHTML = `
            <div>
                <button class="btn btn-primary" onclick="showMoreArticles()">Show More</button>
            </div>
        `;
        articlesList.appendChild(showMoreButton);
    }
}

function showMoreArticles() {
    articlesToShow += 5;
    renderArticles();
}

renderTopStory();
renderTrendingStories();
renderArticles();



