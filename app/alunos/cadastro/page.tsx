"use client";

import { pb } from "@/lib/pocketbase";

export default function CadastroAluno() {

    async function salvar(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const form = e.currentTarget;
        const dados = new FormData(form);
        await pb.collection("tb_aluno").create({
            nome: dados.get("nome"),
            idade: dados.get("idade"),
            email: dados.get("email"),
            telefone: dados.get("telefone"),
        });
        alert("Aluno Cadastrado");
        form.reset();
    }

    return (
        <div>
            <form onSubmit={salvar}>
                <label>Nome do aluno</label>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do aluno"
                />
                <input
                    type="text"
                    name="idade"
                    placeholder="Idade do aluno"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="E-mail do aluno"
                />
                <input
                    type="text"
                    name="telefone"
                    placeholder="Telefone do aluno"
                />
                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    )
}