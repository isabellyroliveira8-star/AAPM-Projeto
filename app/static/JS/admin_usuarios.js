const modal = document.getElementById("modal");

const abrirModal = document.getElementById("abrirModal");

const fecharModal = document.getElementById("fecharModal");

const form = document.getElementById("formUsuario");

const tabela = document.getElementById("tabelaUsuarios");

/* ABRIR MODAL */

abrirModal.addEventListener("click", () => {

    modal.style.display = "flex";

});

/* FECHAR MODAL */

fecharModal.addEventListener("click", () => {

    modal.style.display = "none";

});

/* FECHAR AO CLICAR FORA */

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});

/* CADASTRAR USUÁRIO */

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;

    const role = document.getElementById("role").value;

    tabela.innerHTML += `
    
        <div class="usuario-card">

            <div class="usuario-info">

                <h3>${nome}</h3>

                <p>
                    <strong>Email:</strong>
                    ${email}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${role}
                </p>

                <span class="status">
                    Ativo
                </span>

            </div>

            <div class="acoes">

                <button class="editar">
                    Editar
                </button>

                <button class="desativar">
                    Desativar
                </button>

            </div>

        </div>
    
    `;

    form.reset();

    modal.style.display = "none";

});