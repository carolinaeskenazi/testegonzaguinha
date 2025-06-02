package com.gonzaguinha.demo.alunos;

import jakarta.persistence.Embeddable;

import java.util.List;

@Embeddable
public class InfoResponsavel {

    private String nomeResp;
    private List<String> nomesContato;
    private String telefone;
    private String email;
    private String endereco;


}

