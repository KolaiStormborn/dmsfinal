import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Página Inicial do Sistema</h1>
      <p>Bem-vindo ao Sistema de Gerenciamento de Alunos</p>
      <Link href="/alunos/cadastro">
        Cadastrar Aluno
      </Link>
    </div>
  );
}