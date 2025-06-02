package com.gonzaguinha.demo.dashboard;

public class ResumoInfoMedica {

    private int condSaude; // Descrição da condição

    private int restricaoAlim;
    private int medicacao;
    private int deficiencia;
    private int atencaoPsico;
    private int outros;


    public int getCondSaude() {
        return condSaude;
    }

    public void setCondSaude(int condSaude) {
        this.condSaude = condSaude;
    }

    public int getOutros() {
        return outros;
    }

    public void setOutros(int outros) {
        this.outros = outros;
    }

    public int getAtencaoPsico() {
        return atencaoPsico;
    }

    public void setAtencaoPsico(int atencaoPsico) {
        this.atencaoPsico = atencaoPsico;
    }

    public int getDeficiencia() {
        return deficiencia;
    }

    public void setDeficiencia(int deficiencia) {
        this.deficiencia = deficiencia;
    }

    public int getMedicacao() {
        return medicacao;
    }

    public void setMedicacao(int medicacao) {
        this.medicacao = medicacao;
    }

    public int getRestricaoAlim() {
        return restricaoAlim;
    }

    public void setRestricaoAlim(int restricaoAlim) {
        this.restricaoAlim = restricaoAlim;
    }
}
