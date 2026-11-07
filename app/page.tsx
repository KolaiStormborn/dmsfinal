import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <header className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-400/10 rounded-full mb-3">
            Portal Acadêmico
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Sistema de Alunos
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Selecione uma das opções abaixo para gerenciar os registros da instituição.
          </p>
        </header>

        <nav className="flex flex-col gap-3">
          <Link
            href="/alunos/cadastro"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium text-white bg-linear-to-r from-indigo-500 to-teal-500 hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-indigo-500/20"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Cadastrar Aluno
          </Link>

          <Link
            href="/alunos/consulta"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-slate-600 active:scale-[0.98] transition-all"
          >
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
            Consultar Alunos
          </Link>
        </nav>
      </div>
    </main>
  );
}