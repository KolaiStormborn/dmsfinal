"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";

type Aluno = {
    id: string;
    nome: string;
    idade: string;
    email: string;
    telefone: string;
}

export default function ConsultarAluno() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [busca, setBusca] = useState("");
    const [excluir, setExcluir] = useState<Aluno | null>(null);

    useEffect(() => {
        pb.collection("tb_aluno")
            .getFullList<Aluno>({ sort: "nome", requestKey: null })
            .then(setAlunos);
    }, []);

    const filtrados = alunos.filter((a) =>
        a.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    async function confirmarExclusao() {
        if (!excluir) return;
        await pb.collection("tb_aluno").delete(excluir.id);
        setAlunos((lista) => lista.filter((a) => a.id !== excluir.id));
        setExcluir(null);
    }

    return (
        <div className="bg-purple-300 min-h-screen p-6">
            <div className="w-[80%] mx-auto">
                <input
                    type="text"
                    placeholder="Buscar aluno por nome"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full rounded shadow-sm sm:text-sm bg-white p-2 text-black mb-4"
                />
                <table className="w-full bg-white text-black rounded overflow-hidden shadow-sm text-sm">
                    <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-2 text-left">Nome</th>
                            <th className="p-2 text-left">Idade</th>
                            <th className="p-2 text-left">E-mail</th>
                            <th className="p-2 text-left">Telefone</th>
                            <th className="p-2 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map((a) => (
                            <tr key={a.id} className="border-t border-gray-200">
                                <td className="p-2">{a.nome}</td>
                                <td className="p-2">{a.idade}</td>
                                <td className="p-2">{a.email}</td>
                                <td className="p-2">{a.telefone}</td>
                                <td className="p-2 text-center">
                                    <Link
                                        href={`/alunos/alterar/${a.id}`}
                                        className="rounded-lg px-3 py-1 mr-2 bg-indigo-500 text-white"
                                    >
                                        Alterar
                                    </Link>
                                    <button
                                        onClick={() => setExcluir(a)}
                                        className="rounded-lg px-3 py-1 bg-red-500 text-white"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filtrados.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    Nenhum aluno encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {excluir && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white text-black rounded-lg p-6 w-96 shadow-lg">
                        <p className="mb-4">
                            Deseja realmente deletar o aluno <strong>{excluir.nome}</strong>?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setExcluir(null)}
                                className="rounded-lg px-3 py-1 bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmarExclusao}
                                className="rounded-lg px-3 py-1 bg-red-500 text-white"
                            >
                                Sim, deletar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
