const htmlElement = document.documentElement;
if (!localStorage.getItem("theme")) {
    localStorage.setItem('theme', "purple")
    htmlElement.setAttribute('data-theme', "purple");
} else {
    htmlElement.setAttribute('data-theme', localStorage.getItem("theme"))
}
document.querySelectorAll('.theme-ball').forEach((ball) => {
    ball.addEventListener('click', function () {
        htmlElement.setAttribute('data-theme', ball.getAttribute("ball-color"));
        localStorage.setItem('theme', ball.getAttribute("ball-color"));
    });
})

