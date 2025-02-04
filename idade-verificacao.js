function verificarAcesso() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const bloqueado = cookies.find(cookie => cookie.startsWith('blocked=true'));
    const birthdateCookie = cookies.find(cookie => cookie.startsWith('birthdate='));

    if (bloqueado) {
        bloquearSite();
        return;
    }

    if (birthdateCookie) {
        const birthdate = birthdateCookie.split('=')[1];
        if (calcularIdade(new Date(birthdate)) < 18) {
            document.cookie = `blocked=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
            bloquearSite();
        }
    } else {
        exibirFormularioVerificacao();
    }
}

function calcularIdade(birthDate) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - birthDate.getFullYear();
    const mes = hoje.getMonth() - birthDate.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < birthDate.getDate())) {
        idade--;
    }
    return idade;
}

function exibirFormularioVerificacao() {
    const overlay = document.createElement('div');
    overlay.id = 'verificacao-idade-overlay';
    overlay.innerHTML = `
        <div class="form-container">
            <h1>Verificação de Idade</h1>
            <p>Informe sua data de nascimento:</p>
            <input type="date" id="birthdate" class="input-date">
            <button onclick="verificarIdade()" class="btn-verificar">Verificar</button>
            <p id="error-message" class="error-message"></p>
        </div>
    `;
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.innerHTML = `
        #verificacao-idade-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.form-container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 300px;
    width: 90%;
    color: black; /* Texto preto no fundo branco */
    font-family: Arial, sans-serif; /* Melhor legibilidade */
}

.input-date {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    color: black; /* Texto preto no input */
    background: #f9f9f9; /* Fundo claro para o input */
}

.btn-verificar {
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.btn-verificar:hover {
    background: #45a049; /* Efeito hover mais escuro */
}

.error-message {
    color: red; /* Erros em vermelho */
    margin-top: 10px;
    font-weight: bold;
}

.bloqueado-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: black;
    color: white; /* Texto branco no fundo escuro */
    font-family: Arial, sans-serif;
    text-align: center;
}

    `;
    document.head.appendChild(style);
}

function verificarIdade() {
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        document.getElementById('error-message').innerText = 'Por favor, informe sua data de nascimento.';
        return;
    }

    const idade = calcularIdade(new Date(birthdate));
    const dataExpiracao = new Date();
    dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 100); // Cookie válido por 100 anos

    if (idade >= 18) {
        document.cookie = `birthdate=${birthdate}; path=/; expires=${dataExpiracao.toUTCString()}`;
        removerVerificacaoIdade();
    } else {
        document.cookie = `blocked=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        bloquearSite();
    }
}

function removerVerificacaoIdade() {
    const overlay = document.getElementById('verificacao-idade-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function bloquearSite() {
    document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: black; color: white;">
            <div style="text-align: center;">
                <h1>Acesso Bloqueado</h1>
                <p>Você precisa ter 18 anos ou mais para acessar este site.</p>
            </div>
        </div>
    `;
}

verificarAcesso();
