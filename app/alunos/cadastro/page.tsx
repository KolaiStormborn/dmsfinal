"use client";

import { pb } from "@/lib/pocketbase";

export default function CadastroAluno() {

    async function salvar(e: React.SubmitEvent<HTMLFormElement>) {
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
        <div className="bg-purple-300 h-screen">
            <div className="w-[50%] mx-auto">
                <form onSubmit={salvar} className="w-full">
                    <label className="text-black">Nome do aluno</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do aluno"
                        className="
                        peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm bg-white p-2 text-black mt-2"
                    />
                    <input
                        type="text"
                        name="idade"
                        placeholder="Idade do aluno"
                        className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm bg-white p-2 text-black mt-2"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail do aluno"
                        className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm bg-white p-2 text-black mt-2"
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone do aluno"
                        className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm bg-white p-2 text-black mt-2"
                    />
                    <button type="submit"
                        className="text-center 
                        rounded-lg 
                        w-3xs
                        mx-auto
                        mt-4
                        p-2
                        bg-linear-to-r/srgb from-indigo-500 to-teal-400"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div >
    )
}