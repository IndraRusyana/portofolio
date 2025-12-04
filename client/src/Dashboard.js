const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const htmlElement = document.documentElement;

// 1. Cek Preference User saat load
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateIcon(savedTheme);

// 2. Fungsi Update Icon
function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// 3. Event Listener Klik Tombol
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Ubah Atribut
    htmlElement.setAttribute('data-bs-theme', newTheme);
    
    // Simpan ke LocalStorage
    localStorage.setItem('theme', newTheme);
    
    // Update Icon
    updateIcon(newTheme);
});