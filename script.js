const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const mailtoButton = document.getElementById('mailtoButton');
const mailtoFallback = document.getElementById('mailtoFallback');
const copyEmailButton = document.getElementById('copyEmail');
const fallbackEmail = document.getElementById('fallbackEmail');
let mailOpened = false;
let mailFallbackTimer = null;

if (mailtoButton) {
  mailtoButton.addEventListener('click', event => {
    event.preventDefault();
    mailOpened = false;
    const mailto = mailtoButton.getAttribute('href');

    const onBlur = () => {
      mailOpened = true;
      window.removeEventListener('blur', onBlur);
      if (mailFallbackTimer) {
        clearTimeout(mailFallbackTimer);
        mailFallbackTimer = null;
      }
    };

    window.addEventListener('blur', onBlur);
    window.location.href = mailto;

    mailFallbackTimer = setTimeout(() => {
      if (!mailOpened) {
        mailtoFallback.classList.remove('hidden');
      }
      window.removeEventListener('blur', onBlur);
      mailFallbackTimer = null;
    }, 1200);
  });
}

if (copyEmailButton && fallbackEmail) {
  copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(fallbackEmail.value);
      copyEmailButton.innerHTML = '✓';
      setTimeout(() => {
        copyEmailButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1Z" fill="currentColor"/><path d="M20 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H20C21.1 23 22 22.1 22 21V7C22 5.9 21.1 5 20 5ZM20 21H8V7H20V21Z" fill="currentColor"/></svg>';
      }, 1400);
    } catch (error) {
      console.error('Impossible de copier l\'adresse email:', error);
    }
  });
}
