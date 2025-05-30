package com.gonzaguinha.demo.alunos;

import jakarta.persistence.Embedded;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "alunos")
public class Aluno {

    @Id
    private String id;

    private String fotoImg;
    private String nomeComp;

    private List<String> turmas; // IDs das turmas

    private String tipoSeloId;

    @Embedded
    private InfoResponsavel responsavel;

    @Embedded
    private InfoMedica infoMedica;

    private String restricaoAlimentar;
    private String medicamentos;
    private String acoesEmergenciais;


}

