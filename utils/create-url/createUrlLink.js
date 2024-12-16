
const createUrlLink = (url) => {
    return url
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export default createUrlLink;