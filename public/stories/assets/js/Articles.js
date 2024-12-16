class Articles {
    constructor(articles) {
        this.articles = articles.map(article => {
            return {
                id: article.id,
                image: article.image,
                title: article.title,
                smallDescription: article.smallDescription,
                fullDetails: {
                    author: article.author,
                    date: article.date,
                    description: article.description,
                    tags: article.tags
                }
            }
        })
    }
}

export default Articles;