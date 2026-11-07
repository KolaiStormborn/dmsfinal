"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";

export default function CadastroAluno() {
  const router = useRouter();
  const [salvando, setSalvando] = useState(false);

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSalvando(true);

    try {
      const form = e.currentTarget;
      const dados = new FormData(form);

      await pb.collection("tb_aluno").create({
        nome: dados.get("nome"),
        idade: dados.get("idade"),
        email: dados.get("email"),
        telefone: dados.get("telefone"),
      });

      alert("Aluno cadastrado com sucesso!");
      form.reset();
      router.push("/alunos/consulta");
    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err);
      alert("Erro ao realizar o cadastro. Tente novamente.");
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
            Novo Registro
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Cadastrar Aluno
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Preencha os dados abaixo para incluir o estudante na base do sistema.
          </p>
        </header>

        <form onSubmit={salvar} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nome" className={labelStyle}>
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder="Ex: Matheus Alexandre"
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
              placeholder="Ex: 22"
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
              placeholder="Ex: (65) 99999-9999"
              required
              className={inputStyle}
            />
          </div>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
            <Link
              href="/alunos/consulta"
              className="w-1/2 py-2.5 px-4 rounded-xl font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-slate-600 active:scale-[0.98] transition text-sm text-center"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={salvando}
              className="w-1/2 py-2.5 px-4 rounded-xl font-medium text-white bg-linear-to-r from-indigo-500 to-teal-500 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition text-sm text-center shadow-md shadow-indigo-500/20"
            >
              {salvando ? "Cadastrando..." : "Cadastrar Aluno"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}