-- CreateTable
CREATE TABLE "disciplinas" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "centro" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" TEXT NOT NULL,
    "disciplina_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "passou_de_primeira" BOOLEAN NOT NULL,
    "media_final" DOUBLE PRECISION NOT NULL,
    "nota_didatica_professor" DOUBLE PRECISION NOT NULL,
    "periodo_que_pagou" TEXT NOT NULL,
    "nomeDisciplina" TEXT NOT NULL,
    "carga_horaria" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "desistiu_da_cadeira" BOOLEAN NOT NULL,
    "nivel_dificuldade" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "recomendacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materiais" (
    "id" TEXT NOT NULL,
    "disciplina_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materiais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estatisticas" (
    "id" TEXT NOT NULL,
    "disciplina_id" TEXT NOT NULL,
    "total_avaliacoes" INTEGER NOT NULL,
    "media_notas" DOUBLE PRECISION NOT NULL,
    "media_nota_didatica" DOUBLE PRECISION NOT NULL,
    "media_nivel_dificuldade" DOUBLE PRECISION NOT NULL,
    "taxa_desistencia" DOUBLE PRECISION NOT NULL,
    "nota_disciplina" DOUBLE PRECISION NOT NULL,
    "taxa_aprovacao" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estatisticas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplinas_codigo_key" ON "disciplinas"("codigo");

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiais" ADD CONSTRAINT "materiais_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estatisticas" ADD CONSTRAINT "estatisticas_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
