document.getElementById('theme-toggle').addEventListener('click', function () {
    const htmlElement = document.documentElement;
    if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
    }
});
