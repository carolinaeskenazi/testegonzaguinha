package com.gonzaguinha.demo.alunos;

import jakarta.persistence.Embedded;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "alunos")
public class Aluno {

    @Id
    private String codigoEOL;

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

    public String getFotoImg() {
        return fotoImg;
    }

    public void setFotoImg(String fotoImg) {
        this.fotoImg = fotoImg;
    }

    public String getCodigoEOL() {
        return codigoEOL;
    }

    public void setCodigoEOL(String codigoEOL) {
        this.codigoEOL = codigoEOL;
    }

    public String getNomeComp() {
        return nomeComp;
    }

    public void setNomeComp(String nomeComp) {
        this.nomeComp = nomeComp;
    }

    public List<String> getTurmas() {
        return turmas;
    }

    public void setTurmas(List<String> turmas) {
        this.turmas = turmas;
    }

    public String getTipoSeloId() {
        return tipoSeloId;
    }

    public void setTipoSeloId(String tipoSeloId) {
        this.tipoSeloId = tipoSeloId;
    }

    public InfoResponsavel getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(InfoResponsavel responsavel) {
        this.responsavel = responsavel;
    }

    public InfoMedica getInfoMedica() {
        return infoMedica;
    }

    public void setInfoMedica(InfoMedica infoMedica) {
        this.infoMedica = infoMedica;
    }

    public String getRestricaoAlimentar() {
        return restricaoAlimentar;
    }

    public void setRestricaoAlimentar(String restricaoAlimentar) {
        this.restricaoAlimentar = restricaoAlimentar;
    }

    public String getAcoesEmergenciais() {
        return acoesEmergenciais;
    }

    public void setAcoesEmergenciais(String acoesEmergenciais) {
        this.acoesEmergenciais = acoesEmergenciais;
    }

    public String getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(String medicamentos) {
        this.medicamentos = medicamentos;
    }
}

