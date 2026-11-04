import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-olive-500 h-screen ">
      <h1 className="text-center mt-3">Página Inicial do Sistema</h1>
      <p className="text-center mt-3">Bem-vindo ao Sistema de Gerenciamento de Alunos</p>
      <Link href="/alunos/cadastro">
        <p 
          className="text-center 
                    rounded-lg 
                    w-3xs
                    mx-auto
                    mt-4
                    p-2
                    bg-linear-to-r/srgb from-indigo-500 to-teal-400"
        >Cadastrar Aluno</p>
      </Link>
    </div>
  );
}