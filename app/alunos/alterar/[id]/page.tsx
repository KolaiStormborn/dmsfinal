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
};

export default function AlterarAluno() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    pb.collection("tb_aluno")
      .getOne<Aluno>(id, { requestKey: null })
      .then(setAluno)
      .catch((err) => {
        console.error("Erro ao carregar dados do aluno:", err);
      });
  }, [id]);

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSalvando(true);

    try {
      const dados = new FormData(e.currentTarget);
      await pb.collection("tb_aluno").update(id, {
        nome: dados.get("nome"),
        idade: dados.get("idade"),
        email: dados.get("email"),
        telefone: dados.get("telefone"),
      });
      alert("Aluno alterado com sucesso!");
      router.push("/alunos/consulta");
    } catch (err) {
      console.error("Erro ao atualizar aluno:", err);
      alert("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  }

  const inputStyle =
    "w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition";
  const labelStyle = "block text-xs font-medium text-slate-300 mb-1.5";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <header className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-400/10 rounded-full mb-3">
            Atualização Cadastral
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Alterar Aluno
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Modifique os dados cadastrais do registro selecionado.
          </p>
        </header>

        {aluno ? (
          <form onSubmit={salvar} className="flex flex-col gap-4">
            <div>
              <label htmlFor="nome" className={labelStyle}>
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                defaultValue={aluno.nome}
                placeholder="Ex: Ana Silva"
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="idade" className={labelStyle}>
                Idade
              </label>
              <input
                id="idade"
                type="number"
                name="idade"
                defaultValue={aluno.idade}
                placeholder="Ex: 21"
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelStyle}>
                E-mail institucional / pessoal
              </label>
              <input
                id="email"
                type="email"
                name="email"
                defaultValue={aluno.email}
                placeholder="Ex: aluno@email.com"
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="telefone" className={labelStyle}>
                Telefone / WhatsApp
              </label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                defaultValue={aluno.telefone}
                placeholder="Ex: (00) 00000-0000"
                required
                className={inputStyle}
              />
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.push("/alunos/consulta")}
                className="w-1/2 py-2.5 px-4 rounded-xl font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-slate-600 active:scale-[0.98] transition text-sm text-center"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={salvando}
                className="w-1/2 py-2.5 px-4 rounded-xl font-medium text-white bg-linear-to-r from-indigo-500 to-teal-500 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition text-sm text-center shadow-md shadow-indigo-500/20"
              >
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center py-12 text-slate-400 text-sm">
            Carregando dados do aluno...
          </div>
        )}
      </div>
    </main>
  );
}