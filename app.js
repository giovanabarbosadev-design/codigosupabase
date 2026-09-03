const SUPABASE_URL = "https://raqwrvakigrwkbdydlxx.supabase.co";
const SUPABASE_KEY = "sb_publishable_5XT7Pc1MLv9RYkJb-vR2zg_sRCXn1fM";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const $ = id => document.getElementById(id);

async function buscar(tabela, colunas = "*") {
    return await supabaseClient
        .from(tabela)
        .select(colunas)
        .order("id", { ascending: true });
}

function mostrarErro(mensagem) {
    $("mensagem-erro").style.display = "block";
    $("mensagem-erro").textContent = mensagem;
}

function limparErro() {
    $("mensagem-erro").style.display = "none";
    $("mensagem-erro").textContent = "";
}

function criarLinha(valores) {
    const linha = document.createElement("tr");

    valores.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor ?? "--";
        linha.appendChild(td);
    });

    return linha;
}

async function testarSupabase() {
    const { data, error } = await supabaseClient
        .from("avisos")
        .select("*");

    console.log(data);
    console.log(error);
}

testarSupabase();

async function carregarEventos() {
    const { data, error } = await buscar("eventos");
    const tabela = $("tabela-eventos");

    if (error) {
        console.error("Erro ao carregar eventos:", error);

        tabela.innerHTML = `
            <tr>
                <td colspan="4">Não foi possível carregar os eventos.</td>
            </tr>
        `;

        mostrarErro(
            "Erro ao acessar o banco de dados. Abra o Console do navegador para ver os detalhes."
        );

        return;
    }

    if (!data?.length) {
        tabela.innerHTML = `
            <tr>
                <td colspan="4">Nenhum evento cadastrado.</td>
            </tr>
        `;

        $("total-eventos").textContent = "0";
        return;
    }

    tabela.innerHTML = "";

    data.forEach(evento => {
        tabela.appendChild(
            criarLinha([
                evento.nome,
                evento.data,
                evento.horario,
                evento.local
            ])
        );
    });

    $("total-eventos").textContent = data.length;
}

async function carregarAvisos() {
    const { data, error } = await buscar("avisos");
    const lista = $("lista-avisos");

    if (error) {
        console.error("Erro ao carregar avisos:", error);
        lista.innerHTML = "<li>Não foi possível carregar os avisos.</li>";
        return;
    }

    if (!data?.length) {
        lista.innerHTML = "<li>Nenhum aviso cadastrado.</li>";
        return;
    }

    lista.innerHTML = "";

    data.forEach(aviso => {
        const item = document.createElement("li");
        const titulo = document.createElement("strong");

        titulo.textContent = `${aviso.titulo}: `;

        item.append(
            titulo,
            document.createTextNode(aviso.descricao)
        );

        lista.appendChild(item);
    });
}

async function carregarTarefas() {
    const { data, error } = await buscar("tarefas");
    const tabela = $("tabela-tarefas");

    if (error) {
        console.error("Erro ao carregar tarefas:", error);

        tabela.innerHTML = `
            <tr>
                <td colspan="3">Não foi possível carregar as tarefas.</td>
            </tr>
        `;

        return;
    }

    if (!data?.length) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3">Nenhuma tarefa cadastrada.</td>
            </tr>
        `;

        $("total-tarefas").textContent = "0";
        return;
    }

    tabela.innerHTML = "";

    data.forEach(tarefa => {
        tabela.appendChild(
            criarLinha([
                tarefa.titulo,
                tarefa.disciplina,
                tarefa.entrega
            ])
        );
    });

    $("total-tarefas").textContent = data.length;
}

async function carregarMateriais() {
    const { data, error } = await buscar("materiais");
    const lista = $("lista-materiais");

    if (error) {
        console.error("Erro ao carregar materiais:", error);
        lista.innerHTML = "<li>Não foi possível carregar os materiais.</li>";
        return;
    }

    if (!data?.length) {
        lista.innerHTML = "<li>Nenhum material cadastrado.</li>";
        return;
    }

    lista.innerHTML = "";

    data.forEach(material => {
        const item = document.createElement("li");
        item.textContent = `📄 ${material.titulo}`;
        lista.appendChild(item);
    });
}

async function carregarNotas() {
    const { data, error } = await buscar("notas");
    const tabela = $("tabela-notas");

    if (error) {
        console.error("Erro ao carregar notas:", error);

        tabela.innerHTML = `
            <tr>
                <td colspan="2">Não foi possível carregar as notas.</td>
            </tr>
        `;

        return;
    }

    if (!data?.length) {
        tabela.innerHTML = `
            <tr>
                <td colspan="2">Nenhuma nota cadastrada.</td>
            </tr>
        `;

        $("nota-media").textContent = "0,0";
        return;
    }

    tabela.innerHTML = "";

    let soma = 0;

    data.forEach(item => {
        const nota = Number(item.nota);

        soma += nota;

        tabela.appendChild(
            criarLinha([
                item.disciplina,
                nota.toFixed(1).replace(".", ",")
            ])
        );
    });

    $("nota-media").textContent =
        (soma / data.length)
            .toFixed(1)
            .replace(".", ",");
}

async function carregarCardapio() {
    const { data, error } = await buscar("cardapio");
    const tabela = $("tabela-cardapio");

    if (error) {
        console.error("Erro ao carregar cardápio:", error);

        tabela.innerHTML = `
            <tr>
                <td colspan="2">Não foi possível carregar o cardápio.</td>
            </tr>
        `;

        return;
    }

    if (!data?.length) {
        tabela.innerHTML = `
            <tr>
                <td colspan="2">Nenhum item cadastrado.</td>
            </tr>
        `;

        return;
    }

    tabela.innerHTML = "";

    data.forEach(item => {
        tabela.appendChild(
            criarLinha([
                item.dia,
                item.refeicao
            ])
        );
    });
}

async function carregarFaltas() {
    const { data, error } = await supabaseClient
        .from("dashboard")
        .select("faltas")
        .limit(1);

    if (error) {
        console.error("Erro ao carregar faltas:", error);
        return;
    }

    $("total-faltas").textContent =
        data?.[0]?.faltas ?? 0;
}

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

document.addEventListener("DOMContentLoaded", iniciarSistema);