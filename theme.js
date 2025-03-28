// Check if the user has a preferred theme set in localStorage
const savedTheme = localStorage.getItem('theme');

// If a theme is saved, apply it
if (savedTheme) {
    document.body.classList.add(savedTheme);
} else {
    // Otherwise, apply the system's default theme preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkScheme) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.add('light');
    }
}

// Allow users to toggle the theme
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    // Save the theme preference in localStorage
    localStorage.setItem('theme', newTheme);
}

// Optionally, add a button to toggle themes
document.querySelector('.lang-button').addEventListener('click', toggleTheme);
