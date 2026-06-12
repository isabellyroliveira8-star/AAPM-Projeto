document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const conteudo = document.querySelector(".conteudo-principal");

    // Fade-in sutil ao carregar o gerenciamento de produtos
    if (conteudo) {
        conteudo.style.opacity = "0";
        conteudo.style.transform = "translateY(10px)";
        conteudo.style.transition = "opacity 0.4s ease, transform 0.4s ease";

        setTimeout(() => {
            conteudo.style.opacity = "1";
            conteudo.style.transform = "translateY(0)";
        }, 50);
    }

    // Feedback visual rápido ao clicar nos itens do menu (antes da rota mudar)
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            if (!this.classList.contains("logout")) {
                menuItems.forEach(i => i.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });
});