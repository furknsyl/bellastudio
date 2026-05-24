const i18n = (() => {
  let lang = localStorage.getItem('bella-lang') || 'tr';

  function t(key) {
    return (window.translations[lang] && window.translations[lang][key])
      || (window.translations.tr && window.translations.tr[key])
      || key;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.title = t('page.title');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      el.alt = t(el.dataset.i18nAlt);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });

    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });
    const cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();
  }

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem('bella-lang', lang);
    apply();
  }

  function init() {
    apply();

    const switcher = document.getElementById('langSwitcher');
    const btn = document.getElementById('langBtn');
    const dropdown = document.getElementById('langDropdown');
    if (!switcher || !btn || !dropdown) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = switcher.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', () => {
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    dropdown.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', e => {
        e.stopPropagation();
        setLang(li.dataset.lang);
        switcher.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  return { init, setLang, t };
})();
