// resources.js
// placehold.co image generator

document.addEventListener('DOMContentLoaded', function() {
  const link = document.getElementById('placeholder-image-link');
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Create popup overlay
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.background = 'rgba(20,20,20,0.85)';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '9999';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.35s';
    // Popup content
    let box = document.createElement('div');
    box.style.background = '#eeeeee';
    box.style.padding = '2.5rem 2rem 2rem 2rem';
    box.style.borderRadius = '16px';
    box.style.boxShadow = '0 4px 24px #00345488';
    box.style.border = '2px solid #003454';
    box.style.minWidth = '320px';
    box.style.maxWidth = '90vw';
    box.style.maxHeight = '80vh';
    box.style.overflowY = 'auto';
    box.style.textAlign = 'center';
    box.innerHTML = `
      <h2 style="text-transform:uppercase;margin-bottom:10px;color:#003454;font-size:1.5rem;">Placehold Generator</h2>
      <div style="margin-bottom:1em;">
        <label style="font-weight:bold;">Width: <input type="number" id="ph-width" value="300" min="1" style="width:100px;padding:0.5em;border-radius:6px;border:1px solid #ccc;"></label>
        <label style="font-weight:bold;display:block;">Height: <input type="number" id="ph-height" value="200" min="1" style="width:100px;padding:0.5em;border-radius:6px;border:1px solid #ccc;"></label>
      </div>
      <button id="ph-generate" style="background:#003454;color:#eeeeee;border:none;border-radius:8px;padding:0.6em 1.2em;font-size:1rem;cursor:pointer;margin-right:1em;">Generate</button>
      <button id="ph-close" style="background:#1a1a1a;color:#eeeeee;border:none;border-radius:8px;padding:0.6em 1.2em;font-size:1rem;cursor:pointer;">Close</button>
      <div id="ph-result" style="margin-top:1.5em;"></div>
    `;
    popup.appendChild(box);
    document.body.appendChild(popup);
    // Fade in effect
    setTimeout(function() { popup.style.opacity = '1'; }, 10);
    // Autofocus width input
    setTimeout(function() {
      box.querySelector('#ph-width').focus();
    }, 100);
    // Close handler
    box.querySelector('#ph-close').onclick = function() {
      popup.style.opacity = '0';
      setTimeout(function() { document.body.removeChild(popup); }, 350);
    };
    // Generate handler
    box.querySelector('#ph-generate').onclick = function() {
      let w = box.querySelector('#ph-width').value;
      let h = box.querySelector('#ph-height').value;
      let url = `https://placehold.co/${w}x${h}`;
      box.querySelector('#ph-result').innerHTML = `<a href="${url}" id="ph-link" target="_blank" style="color:#003454;font-weight:bold;cursor:pointer;">${url} <i class="fa-solid fa-copy"></i></a><br><img src="${url}" style="margin-top:0.7em;max-width:100%;border-radius:8px;border:1px solid #003454;box-shadow:0 2px 8px #00345444;">`;
      // Add copy-on-click for the link
      setTimeout(function() {
        const phLink = box.querySelector('#ph-link');
        if (phLink) {
          phLink.onclick = function(e) {
            e.preventDefault();
            navigator.clipboard.writeText(url).then(function() {
              phLink.textContent = 'Copied!';
              phLink.style.color = '#1a1a1a';
              setTimeout(function() {
                phLink.textContent = url;
                phLink.style.color = '#003454';
              }, 1200);
            });
          };
        }
      }, 50);
    };
    // Enable Enter key to trigger Generate
    box.querySelector('#ph-width').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') box.querySelector('#ph-generate').click();
    });
    box.querySelector('#ph-height').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') box.querySelector('#ph-generate').click();
    });
  });
});