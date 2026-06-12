document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btn-entrar");

    btn.addEventListener("click", () => {

        btn.innerHTML = "CARREGANDO...";

        setTimeout(() => {
            window.location.href = "/auth/login";
        }, 500);

    });

});