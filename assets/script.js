(function(){
  const root = document.documentElement;
  const toggle = () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateButton(next);
  };

  const updateButton = (theme) => {
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    btn.setAttribute('aria-pressed', theme === 'dark');
    if(theme === 'dark'){
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  };

  // Initialize theme from localStorage or system
  const initTheme = () => {
    const saved = localStorage.getItem('site-theme');
    if(saved){ root.setAttribute('data-theme', saved); updateButton(saved); return; }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    updateButton(prefersDark ? 'dark' : 'light');
  };

  document.addEventListener('DOMContentLoaded', () =>{
    initTheme();
    const btn = document.getElementById('themeToggle');
    if(btn) btn.addEventListener('click', toggle);

    // Make iframes responsive by ensuring they have title and loading=lazy
    document.querySelectorAll('iframe').forEach((f, i)=>{
      if(!f.hasAttribute('title')) f.setAttribute('title', `Embedded frame ${i+1}`);
      if(!f.hasAttribute('loading')) f.setAttribute('loading', 'lazy');
    });
  });
})();
