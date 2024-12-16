async function loadFooter() {
    const response = await fetch('/footer/footer.html');
    document.getElementById('footer').innerHTML = await response.text();
}

loadFooter();