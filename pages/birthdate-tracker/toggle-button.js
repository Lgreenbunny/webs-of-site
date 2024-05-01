let style = localStorage.getItem("style");

if (style == null) {
    localStorage.setItem("style", "Light");
} if (style == "Dark") {
    document.body.classList.toggle('dark-mode');
}

document.querySelector('.dark-mode-toggle button').addEventListener('click', function() {
    style = localStorage.getItem("style");
    if (style == "Dark") {
        localStorage.setItem("style", "Light")
    } if (style == "Light") {
        localStorage.setItem("style", "Dark")
    }
    document.body.classList.toggle('dark-mode');
});