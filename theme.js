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

 function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  }

  // Auto-close sidebar when a link inside is clicked
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("sidebar").classList.remove("open");
    });
  });
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const seekBar = document.getElementById("seekBar");
  const time = document.getElementById("time");

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
    }
  });

  audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
    time.textContent = `${minutes}:${seconds}`;
  });

  seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  });