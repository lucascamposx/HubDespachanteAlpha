import styles from "./Orcamento.module.css";
import Header from "../../components/Header";
import { useState } from 'react';
import { useEffect } from "react";
export default function Orcamento() {
    // Inicializamos o estado com a propriedade 'selecionado' para controlar o checkbox
    const [servicos, setServicos] = useState([
        { nome: "Transferência", valor: 141.75, valorAprox: 142.00, selecionado: false, valorOriginal: 0 },
        { nome: "Taxa ATPV", valor: 49.30, valorAprox: 50.00, selecionado: false },
        { nome: "Emissão ATPV", valor: 120.00, selecionado: false },
        { nome: "Segunda Via de CRV", valor: 118.69, valorAprox: 120.00, selecionado: false },
        { nome: "Autorização de Qualquer Natureza", valor: 49.30, valorAprox: 50.00, selecionado: false },
        { nome: "Vistoria Veiculo Leve", valor: 71.95, valorAprox: 72.00, selecionado: false },
        { nome: "Vistoria Veiculo Leve Foto", valor: 170.00, selecionado: false },
        { nome: "Vistoria Veiculo Pesado", valor: 88.52, valorAprox: 90.00, selecionado: false },
        { nome: "Vistoria Veiculo Pesado Foto", valor: 190.00, selecionado: false },
        { nome: "Ordem de Placa", valor: 49.30, valorAprox: 50.00, selecionado: false },
        { nome: "Placa Unica", valor: 210.00, selecionado: false },
        { nome: "Par de Placa", valor: 310.00, selecionado: false },
        { nome: "Laudo Pericial", valor: 470.00, selecionado: false },
        { nome: "Alteração de Categoria", valor: 129.63, valorAprox: 130.00, selecionado: false },
        { nome: "Primeiro emplacamento", valor: 234.25, valorAprox: 235.00, selecionado: false },
        { nome: "IPVA", valor: "", selecionado: false },
        { nome: "Baixa de Gravame", valor: 129.63, valorAprox: 130.00, selecionado: false },
        { nome: "Inclusão de Gravame", valor: 129.63, valorAprox: 130.00, selecionado: false },
        { nome: "Alteração de Motor", valor: 129.63, valorAprox: 130.00, selecionado: false },
        { nome: "R.Firma", valor: 250.00, selecionado: false },
        { nome: "R.Rasura", valor: 450.00, selecionado: false },
        { nome: "Despachante", valor: 130.00, selecionado: false },
        { nome: "Despachante", valor: 150.00, selecionado: false },
        { nome: "Despachante", valor: 180.00, selecionado: false },
    ]);

    // Alterna o estado do checkbox (marcado/desmarcado)
    const handleCheck = (index) => {
        const novosServicos = [...servicos];
        // Inverte o valor booleano atual
        novosServicos[index].selecionado = !novosServicos[index].selecionado;
        setServicos(novosServicos);
    };

    // Atualiza o valor numérico quando o usuário digita no input
    const handleChange = (index, novoValor) => {
        const novosServicos = [...servicos];
        // O parseFloat garante que o valor seja tratado como número para o cálculo
        novosServicos[index].valor = parseFloat(novoValor) || 0;
        setServicos(novosServicos);
    };

    // Esta função "constrói" a mensagem de texto baseada no que está selecionado
const gerarTextoOrcamento = () => {
    const selecionados = servicos.filter(s => s.selecionado);

    if (selecionados.length === 0) return "Nenhum serviço selecionado.";

    let texto = "*Orçamento:*\n\n";
    let total = 0;

    selecionados.forEach(s => {
        // Lógica crucial: se valoresAproximados for true e existir valorAprox, use-o. 
        // Caso contrário, use o valor padrão.
        const valorEfetivo = (valoresAproximados && s.valorAprox !== undefined) 
            ? s.valorAprox 
            : (parseFloat(s.valor) || 0);

        const valorFormatado = valorEfetivo.toFixed(2).replace('.', ',');
        texto += ` ${s.nome}: R$ ${valorFormatado}\n`;
        total += valorEfetivo; 
    });

    texto += `\n*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
    return texto;
};
    // Função que envia o texto gerado para a área de transferência (Ctrl+V)
    const copiarParaClipboard = (e) => {
        e.preventDefault(); // Evita que o botão recarregue a página
        const texto = gerarTextoOrcamento();

        // Navigator é uma API nativa do navegador para lidar com o sistema
        if (navigator.clipboard) {
            navigator.clipboard.writeText(texto)
                .then(() => alert("Copiado com sucesso!"))
                .catch(err => alert("Erro ao copiar: " + err));
        }
    };


    const [valoresAproximados, setValoresAproximados] = useState(false);

    function setarValoresAproximados() {
        setValoresAproximados(!valoresAproximados);
    }


    return (
        <div>
            <Header />
            <form className={styles.formOrcamento}>
                <h2>Orçamento de Serviços</h2>

                <button type="button" onClick={setarValoresAproximados}>{valoresAproximados ? "Usar valores originais" : "Usar valores aproximados"}</button>

                {servicos.map((s, index) => (
                    <div key={index} className={styles.itemServico}>
                        <label>
                            {/* O checkbox agora está ligado ao estado 'selecionado' */}
                            <input
                                type="checkbox"
                                checked={s.selecionado}
                                onChange={() => handleCheck(index)}
                            />
                            {s.nome}
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={valoresAproximados ? s.valorAprox : s.valor}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    </div>
                ))}

                {/* Textarea para visualização prévia do que será copiado */}
                <textarea
                    className={styles.previewOrcamento}
                    readOnly // O usuário não digita aqui, ele apenas vê o resultado
                    value={gerarTextoOrcamento()}
                    rows={8}
                />

                <button
                    type="button" // Importante: type button não envia o formulário
                    onClick={copiarParaClipboard}
                >
                    Copiar para WhatsApp
                </button>
            </form>
        </div>
    );
}