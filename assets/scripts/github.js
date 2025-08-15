async function fetchRepos(user) {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    if (!response.ok) return [];
    return await response.json();
}

async function getRepoImage(owner, repo) {
    const imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${repo}.png`;
    try {
        const res = await fetch(imageUrl, { method: 'HEAD' });
        if (res.ok) return imageUrl;
    } catch {}
    return null;
}

async function renderRepoList(repos, owner) {
    if (repos.length === 0) return '<p>No repositories found.</p>';
    const repoItems = await Promise.all(repos.map(async repo => {
        const image = await getRepoImage(owner, repo.name);
        return `<article class="fadein-article">
            <a href="#">
                ${image ? `<img src="${image}" alt="${repo.name} logo">` : ''}
            </a>
            <section>
                <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
                <p> ${repo.description ? `<br><span>${repo.description}</span>` : ''} </p>
                <a class="read" href="#" >View More &rarr;</a>
            </section>
        </article>`;
    }));
    return '<section id="projects">' + repoItems.join('') + '</section>';
}

async function renderProjects() {
    const container = document.getElementById('projects');
    if (!container) return;

    const repoListKei = document.getElementById('repo-list-kei');
    const repoListOrg = document.getElementById('repo-list-org');

    // KeiBlackley
    const keiRepos = await fetchRepos('KeiBlackley');
    repoListKei.innerHTML = await renderRepoList(keiRepos, 'KeiBlackley');

    // Keirran-Blackley
    const orgRepos = await fetchRepos('Keirran-Blackley');
    repoListOrg.innerHTML = await renderRepoList(orgRepos, 'Keirran-Blackley');
}

// Only load projects when the tab is activated
window.renderProjects = renderProjects;