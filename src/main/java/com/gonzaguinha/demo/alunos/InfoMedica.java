package com.gonzaguinha.demo.alunos;

import jakarta.persistence.Embeddable;


@Embeddable
public class InfoMedica {

    private int faltasMed;
    private int totalFaltas;
    private String condSaude; // Descrição da condição

    private boolean restricaoAlim;
    private boolean medicacao;
    private boolean deficiencia;
    private boolean atencaoPsico;
    private boolean outros;

    public int getFaltasMed() {
        return faltasMed;
    }

    public void setFaltasMed(int faltasMed) {
        this.faltasMed = faltasMed;
    }

    public int getTotalFaltas() {
        return totalFaltas;
    }

    public void setTotalFaltas(int totalFaltas) {
        this.totalFaltas = totalFaltas;
    }

    public String getCondSaude() {
        return condSaude;
    }

    public void setCondSaude(String condSaude) {
        this.condSaude = condSaude;
    }

    public boolean isRestricaoAlim() {
        return restricaoAlim;
    }

    public void setRestricaoAlim(boolean restricaoAlim) {
        this.restricaoAlim = restricaoAlim;
    }

    public boolean isMedicacao() {
        return medicacao;
    }

    public void setMedicacao(boolean medicacao) {
        this.medicacao = medicacao;
    }

    public boolean isDeficiencia() {
        return deficiencia;
    }

    public void setDeficiencia(boolean deficiencia) {
        this.deficiencia = deficiencia;
    }

    public boolean isAtencaoPsico() {
        return atencaoPsico;
    }

    public void setAtencaoPsico(boolean atencaoPsico) {
        this.atencaoPsico = atencaoPsico;
    }

    public boolean isOutros() {
        return outros;
    }

    public void setOutros(boolean outros) {
        this.outros = outros;
    }
}
