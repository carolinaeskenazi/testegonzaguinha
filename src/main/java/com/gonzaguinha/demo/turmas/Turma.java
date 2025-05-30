package com.gonzaguinha.demo.turmas;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "turmas")

public class Turma {

    @Id
    private String id;

    private String nomeTurma;
    private String serie;

    private boolean manha;
    private boolean tarde;
    private boolean noite;

    private List<String> alunos; // IDs dos alunos


}
