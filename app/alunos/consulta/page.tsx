"use client";

import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";

type Aluno = {
    id: string;
    nome: string;
    idade: string;
    email: string;
    telefone: string;
}

export default function consultarAluno(){
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [busca, setBusca] = useState("");

    useEffect(() =>{
        pb.collection("tb_aluno")
            .getFullList<Aluno>({ sort: "nome", requestKey: null})
            .then(setAlunos);
    }, []);

    const filtrados = alunos.filter((a)=>
        a.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    return(
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Buscar aluno por nome"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.map((a)=>(
                    <tr>
                        <td>{a.nome}</td>
                        <td>{a.idade}</td>
                        <td>{a.email}</td>
                        <td>{a.telefone}</td>
                        <td>{a.id}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}