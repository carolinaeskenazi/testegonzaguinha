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

    public String getNomeResp() {
        return nomeResp;
    }

    public void setNomeResp(String nomeResp) {
        this.nomeResp = nomeResp;
    }

    public List<String> getNomesContato() {
        return nomesContato;
    }

    public void setNomesContato(List<String> nomesContato) {
        this.nomesContato = nomesContato;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}

