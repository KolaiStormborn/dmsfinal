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
};

export default function ConsultarAluno() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState("");
  const [excluir, setExcluir] = useState<Aluno | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    pb.collection("tb_aluno")
      .getFullList<Aluno>({ sort: "nome", requestKey: null })
      .then((res) => setAlunos(res))
      .catch((err) => console.error("Erro ao listar alunos:", err))
      .finally(() => setCarregando(false));
  }, []);

  const filtrados = alunos.filter((a) =>
    a.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  async function confirmarExclusao() {
    if (!excluir) return;
    try {
      await pb.collection("tb_aluno").delete(excluir.id);
      setAlunos((lista) => lista.filter((a) => a.id !== excluir.id));
      setExcluir(null);
    } catch (err) {
      console.error("Erro ao excluir aluno:", err);
      alert("Não foi possível excluir o registro.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Cabeçalho da página */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-400/10 rounded-full mb-2">
              Gestão de Cadastros
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Lista de Alunos
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Visualize, filtre, altere ou remova registros de alunos da base.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition text-sm"
            >
              Início
            </Link>
            <Link
              href="/alunos/cadastro"
              className="px-4 py-2.5 rounded-xl font-medium text-white bg-linear-to-r from-indigo-500 to-teal-500 hover:opacity-95 active:scale-[0.98] transition text-sm shadow-md shadow-indigo-500/20"
            >
              + Novo Aluno
            </Link>
          </div>
        </header>

        {/* Barra de Pesquisa */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nome do aluno..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
          />
        </div>

        {/* Tabela de Dados */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Idade</th>
                  <th className="px-6 py-4">E-mail</th>
                  <th className="px-6 py-4">Telefone</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {carregando ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Carregando dados...
                    </td>
                  </tr>
                ) : filtrados.length > 0 ? (
                  filtrados.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-100">
                        {a.nome}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {a.idade ? `${a.idade} anos` : "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                        {a.email || "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {a.telefone || "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/alunos/alterar/${a.id}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-teal-300 bg-teal-400/10 hover:bg-teal-400/20 border border-teal-500/20 transition"
                          >
                            Alterar
                          </Link>
                          <button
                            type="button"
                            onClick={() => setExcluir(a)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition"
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Nenhum aluno encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {excluir && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-2">Excluir Aluno</h2>
            <p className="text-slate-400 text-sm mb-6">
              Tem certeza que deseja deletar o cadastro de{" "}
              <strong className="text-slate-100">{excluir.nome}</strong>? Essa
              ação não pode ser desfeita.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setExcluir(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-750 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarExclusao}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition shadow-md shadow-rose-600/20"
              >
                Sim, deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}