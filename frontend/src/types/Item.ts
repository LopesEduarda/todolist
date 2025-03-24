export type Item = {
    id: number;
    title: string;
    descricao: string;
    createdAt: string;
    dataConclusao?: string | null;
    isCompleted: boolean;
    status: "PENDENTE" | "CONCLUIDA";
};

export type UpdatedTask = {
  isCompleted: boolean;
  dataConclusao: string | null;
  status: "PENDENTE" | "CONCLUIDA";
};
