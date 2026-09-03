const SUPABASE_URL = "https://raqwrvakigrwkbdydlxx.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcXdydmFraWdyd2tiZHlkbHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NTg2NjAsImV4cCI6MjEwNDAzNDY2MH0.2t4olQ7gCbFC2ekWMBajoxHcl32vTQcA9ZUZRT3jVoI";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


function mostrarErro(mensagem) {

    const caixa = document.getElementById("mensagem-erro");

    caixa.style.display = "block";

    caixa.textContent = mensagem;
}


function limparErro() {

    const caixa = document.getElementById("mensagem-erro");

    caixa.style.display = "none";

    caixa.textContent = "";
}


/* =========================
   EVENTOS
========================= */

async function carregarEventos() {

    const { data, error } = await supabaseClient
        .from("eventos")
        .select("*")
        .order("id", { ascending: true });


    const tabela = document.getElementById("tabela-eventos");


    if (error) {

        console.error("Erro ao carregar eventos:", error);

        tabela.innerHTML = `
            <tr>
                <td colspan="4">
                    Não foi possível carregar os eventos.
                </td>
            </tr>
        `;

        mostrarErro(
            "Erro ao acessar o banco de dados. Abra o Console do navegador para ver os detalhes."
        );

        return;
    }


    tabela.innerHTML = "";


    if (!data || data.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum evento cadastrado.
                </td>
            </tr>
        `;

        document.getElementById("total-eventos").textContent = "0";

        return;
    }


    data.forEach(evento => {

        const linha = document.createElement("tr");


        const nome = document.createElement("td");

        nome.textContent = evento.nome;


        const dataEvento = document.createElement("td");

        dataEvento.textContent = evento.data;


        const horario = document.createElement("td");

        horario.textContent = evento.horario || "--";


        const local = document.createElement("td");

        local.textContent = evento.local || "--";


        linha.appendChild(nome);

        linha.appendChild(dataEvento);

        linha.appendChild(horario);

        linha.appendChild(local);


        tabela.appendChild(linha);

    });


    document.getElementById("total-eventos").textContent =
        data.length;
}


/* =========================
   AVISOS
========================= */

async function carregarAvisos() {

    const { data, error } = await supabaseClient
        .from("avisos")
        .select("*")
        .order("id", { ascending: true });


    const lista = document.getElementById("lista-avisos");


    if (error) {

        console.error("Erro ao carregar avisos:", error);

        lista.innerHTML =
            "<li>Não foi possível carregar os avisos.</li>";

        return;
    }


    lista.innerHTML = "";


    if (!data || data.length === 0) {

        lista.innerHTML =
            "<li>Nenhum aviso cadastrado.</li>";

        return;
    }


    data.forEach(aviso => {

        const itemLista = document.createElement("li");

        const titulo = document.createElement("strong");


        titulo.textContent = `${aviso.titulo}: `;


        itemLista.appendChild(titulo);


        itemLista.appendChild(
            document.createTextNode(aviso.descricao)
        );


        lista.appendChild(itemLista);

    });
}


/* =========================
   TAREFAS
========================= */

async function carregarTarefas() {

    const { data, error } = await supabaseClient
        .from("tarefas")
        .select("*")
        .order("id", { ascending: true });


    const tabela =
        document.getElementById("tabela-tarefas");


    if (error) {

        console.error("Erro ao carregar tarefas:", error);

        tabela.innerHTML = `
            <tr>
                <td colspan="3">
                    Não foi possível carregar as tarefas.
                </td>
            </tr>
        `;

        return;
    }


    tabela.innerHTML = "";


    if (!data || data.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="3">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

        document.getElementById("total-tarefas").textContent =
            "0";

        return;
    }


    data.forEach(tarefa => {

        const linha =
            document.createElement("tr");


        const titulo =
            document.createElement("td");

        titulo.textContent =
            tarefa.titulo;


        const disciplina =
            document.createElement("td");

        disciplina.textContent =
            tarefa.disciplina;


        const entrega =
            document.createElement("td");

        entrega.textContent =
            tarefa.entrega;


        linha.appendChild(titulo);

        linha.appendChild(disciplina);

        linha.appendChild(entrega);


        tabela.appendChild(linha);

    });


    document.getElementById("total-tarefas").textContent =
        data.length;
}


/* =========================
   MATERIAIS
========================= */

async function carregarMateriais() {

    const { data, error } = await supabaseClient
        .from("materiais")
        .select("*")
        .order("id", { ascending: true });


    const lista =
        document.getElementById("lista-materiais");


    if (error) {

        console.error(
            "Erro ao carregar materiais:",
            error
        );

        lista.innerHTML =
            "<li>Não foi possível carregar os materiais.</li>";

        return;
    }


    lista.innerHTML = "";


    if (!data || data.length === 0) {

        lista.innerHTML =
            "<li>Nenhum material cadastrado.</li>";

        return;
    }


    data.forEach(material => {

        const item =
            document.createElement("li");


        item.textContent =
            `📄 ${material.titulo}`;


        lista.appendChild(item);

    });
}


/* =========================
   NOTAS
========================= */

async function carregarNotas() {

    const { data, error } = await supabaseClient
        .from("notas")
        .select("*")
        .order("id", { ascending: true });


    const tabela =
        document.getElementById("tabela-notas");


    if (error) {

        console.error(
            "Erro ao carregar notas:",
            error
        );

        tabela.innerHTML = `
            <tr>
                <td colspan="2">
                    Não foi possível carregar as notas.
                </td>
            </tr>
        `;

        return;
    }


    tabela.innerHTML = "";


    if (!data || data.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="2">
                    Nenhuma nota cadastrada.
                </td>
            </tr>
        `;


        document.getElementById(
            "nota-media"
        ).textContent = "0,0";


        return;
    }


    let soma = 0;


    data.forEach(item => {

        const linha =
            document.createElement("tr");


        const disciplina =
            document.createElement("td");

        disciplina.textContent =
            item.disciplina;


        const nota =
            document.createElement("td");


        const numeroNota =
            Number(item.nota);


        nota.textContent =
            numeroNota
                .toFixed(1)
                .replace(".", ",");


        soma += numeroNota;


        linha.appendChild(disciplina);

        linha.appendChild(nota);


        tabela.appendChild(linha);

    });


    const media =
        soma / data.length;


    document.getElementById(
        "nota-media"
    ).textContent =
        media
            .toFixed(1)
            .replace(".", ",");
}


/* =========================
   CARDÁPIO
========================= */

async function carregarCardapio() {

    const { data, error } = await supabaseClient
        .from("cardapio")
        .select("*")
        .order("id", { ascending: true });


    const tabela =
        document.getElementById(
            "tabela-cardapio"
        );


    if (error) {

        console.error(
            "Erro ao carregar cardápio:",
            error
        );

        tabela.innerHTML = `
            <tr>
                <td colspan="2">
                    Não foi possível carregar o cardápio.
                </td>
            </tr>
        `;

        return;
    }


    tabela.innerHTML = "";


    if (!data || data.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="2">
                    Nenhum item cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(item => {

        const linha =
            document.createElement("tr");


        const dia =
            document.createElement("td");

        dia.textContent =
            item.dia;


        const refeicao =
            document.createElement("td");

        refeicao.textContent =
            item.refeicao;


        linha.appendChild(dia);

        linha.appendChild(refeicao);


        tabela.appendChild(linha);

    });
}


/* =========================
   FALTAS
========================= */

async function carregarFaltas() {

    const { data, error } = await supabaseClient
        .from("dashboard")
        .select("faltas")
        .limit(1);


    if (error) {

        console.error(
            "Erro ao carregar faltas:",
            error
        );

        return;
    }


    if (!data || data.length === 0) {

        document.getElementById(
            "total-faltas"
        ).textContent = "0";

        return;
    }


    document.getElementById(
        "total-faltas"
    ).textContent =
        data[0].faltas ?? 0;
}


/* =========================
   INICIAR SISTEMA
========================= */

async function iniciarSistema() {

    limparErro();


    await Promise.all([

        carregarEventos(),

        carregarAvisos(),

        carregarTarefas(),

        carregarMateriais(),

        carregarNotas(),

        carregarCardapio(),

        carregarFaltas()

    ]);

}


document.addEventListener(
    "DOMContentLoaded",
    iniciarSistema
);