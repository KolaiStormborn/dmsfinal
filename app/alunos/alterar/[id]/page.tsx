"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";

type Aluno = {
    id: string;
    nome: string;
    idade: string;
    email: string;
    telefone: string;
}

export default function AlterarAluno() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [aluno, setAluno] = useState<Aluno | null>(null);

    useEffect(() => {
        pb.collection("tb_aluno")
            .getOne<Aluno>(id, { requestKey: null })
            .then(setAluno);
    }, [id]);

    async function salvar(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const dados = new FormData(e.currentTarget);
        await pb.collection("tb_aluno").update(id, {
            nome: dados.get("nome"),
            idade: dados.get("idade"),
            email: dados.get("email"),
            telefone: dados.get("telefone"),
        });
        alert("Aluno Alterado");
        router.push("/alunos/consulta");
    }

    const campo = "w-full rounded shadow-sm sm:text-sm bg-white p-2 text-black mt-2";

    return (
        <div className="bg-purple-300 h-screen">
            <div className="w-[50%] mx-auto">
                <h1 className="text-black text-xl pt-6">Alterar aluno</h1>
                {aluno && (
                    <form onSubmit={salvar} className="w-full">
                        <input type="text" name="nome" defaultValue={aluno.nome} placeholder="Nome do aluno" className={campo} />
                        <input type="text" name="idade" defaultValue={aluno.idade} placeholder="Idade do aluno" className={campo} />
                        <input type="text" name="email" defaultValue={aluno.email} placeholder="E-mail do aluno" className={campo} />
                        <input type="text" name="telefone" defaultValue={aluno.telefone} placeholder="Telefone do aluno" className={campo} />
                        <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                className="rounded-lg px-4 py-2 bg-linear-to-r/srgb from-indigo-500 to-teal-400"
                            >
                                Salvar
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/alunos/consulta")}
                                className="rounded-lg px-4 py-2 bg-gray-300 text-black"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
