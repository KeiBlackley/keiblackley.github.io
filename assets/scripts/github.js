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

async function renderRepoList(repos, owner, filterUsername = false) {
    if (repos.length === 0) return '<p>No repositories found.</p>';
    // Only show repos with images or GitHub Pages
    const repoItems = [];
    await Promise.all(repos.map(async repo => {
        const image = await getRepoImage(owner, repo.name);
        const hasPages = repo.has_pages;
        // Hide repos with username in the name only for user repos
        if ((image || hasPages) && (!filterUsername || !repo.name.toLowerCase().includes(owner.toLowerCase()))) {
            repoItems.push({
                html: `<li>
                    <div class="card">
                        <div class="preview-container">
                            <a href="${repo.html_url}" target="_blank"> <div class="preview" style="background-image: url('${image || ''}');"></div></a>
                        </div>
                        <div class="truecontainer">
                            <header class="row">
                                <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
                            </header>
                            ${repo.description ? `<div class="repo-desc"><span>${repo.description}</span></div>` : ''}
                            ${hasPages ? `<div class="repo-pages"><a href='https://${owner}.github.io/${repo.name}/' target='_blank'>View GitHub Pages</a></div>` : ''}
                        
                        </div>
                    </div>
                </li>`
            });
        }
    }));
    if (repoItems.length === 0) return '<p>No repositories found with images or GitHub Pages.</p>';
    return '<ul class="cards-grid"><div class="profile-card">' + repoItems.map(r => r.html).join('') + '</div></ul>';
}

async function renderProjects() {
    const container = document.getElementById('projects');
    if (!container) return;

    const repoListKei = document.getElementById('repo-list-kei');
    const repoListOrg = document.getElementById('repo-list-org');

    // KeiBlackley (user) - filter username
    const keiRepos = await fetchRepos('KeiBlackley');
    repoListKei.innerHTML = await renderRepoList(keiRepos, 'KeiBlackley', true);

    // Keirran-Blackley (org) - do not filter username
    const orgRepos = await fetchRepos('Keirran-Blackley');
    repoListOrg.innerHTML = await renderRepoList(orgRepos, 'Keirran-Blackley', false);
}

window.renderProjects = renderProjects;