export default function paginatePosts(posts) {
    const numPages = Math.trunc(posts.length / 8);
    const pages = [];
    let isArray = false;

    if (numPages > 1) {
        isArray = true;
        for (let x = 0; x < numPages; x++) {
            pages.push([]);
            for (let y = x*8; y < x*8+8; y++) {
                pages[x].push(posts[y]);
            }
        }

        if(posts.length % 8 !== 0) {
            const remainder = posts.length - (numPages * 8);
            pages.push([]);
            for(let i = 0; i < remainder; i++) {
                pages[pages.length-1].push(posts[numPages * 8 + i]);
            }
        }

        return [pages, isArray];
    } else {
        return [posts, isArray];
    }
}