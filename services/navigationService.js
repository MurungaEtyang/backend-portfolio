import pool from "../database/config.js";
import createUrlLink from "../utils/create-url/createUrlLink.js";

const ensureUniqueSlug = async (slug) => {
    const [rows] = await pool.query(
        'SELECT url FROM navigation_items WHERE url LIKE ?',
        [`/${slug}%`]
    );

    const existingSlugs = rows.map((row) => row.url.replace('/', ''));
    let count = 0;
    let candidateSlug = slug;

    while (existingSlugs.includes(candidateSlug)) {
        count += 1;
        candidateSlug = `${slug}-${count}`;
    }

    return candidateSlug;
};

export const addNavItem = async (name) => {
    const baseSlug = createUrlLink(name);
    const url = `/${await ensureUniqueSlug(baseSlug)}`;

    const [result] = await pool.query(
        'INSERT INTO navigation_items (name, url) VALUES (?, ?)',
        [name, url]
    );

    return { id: result.insertId, name, url };
};
