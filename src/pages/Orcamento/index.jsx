import styles from "./Orcamento.module.css";
import Header from "../../components/Header";
import { useState } from 'react';

export default function Orcamento() {
    // Inicializamos o estado com a propriedade 'selecionado' para controlar o checkbox
    const [servicos, setServicos] = useState([
        { nome: "Transferência", valor: 135.70, valorAprox: 140.00, selecionado: false },
        { nome: "Taxa ATPV", valor: 47.20, valorAprox: 50.00, selecionado: false },
        { nome: "Emissão ATPV", valor: 120.00, selecionado: false },
        { nome: "Segunda Via de CRV", valor: 113.63, valorAprox: 120.00, selecionado: false },
        { nome: "Autorização de Qualquer Natureza", valor: 47.20, valorAprox: 50.00, selecionado: false },
        { nome: "Vistoria Veiculo Leve", valor: 69.00, valorAprox: 70.00, selecionado: false },
        { nome: "Vistoria Veiculo Leve Foto", valor: 120.00, selecionado: false },
        { nome: "Vistoria Veiculo Pesado", valor: 84.00, selecionado: false },
        { nome: "Vistoria Veiculo Pesado Foto", valor: 135.00, selecionado: false },
        { nome: "Ordem de Placa", valor: 47.20, valorAprox: 50.00, selecionado: false },
        { nome: "Par de Placa", valor: 280.00, selecionado: false },
        { nome: "Placa Unica", valor: 190.00, selecionado: false },
        { nome: "Laudo Pericial", valor: 470.00, selecionado: false },
        { nome: "Alteração de Categoria", valor: 124.10, valorAprox: 125.00, selecionado: false },
        { nome: "Primeiro emplacamento", valor: 224.25, valorAprox: 225.00, selecionado: false },
        { nome: "IPVA", valor: "", selecionado: false },
        { nome: "Baixa de Gravame", valor: 124.10, valorAprox: 125.00, selecionado: false },
        { nome: "Inclusão de Gravame", valor: 124.10, valorAprox: 125.00, selecionado: false },
        { nome: "Despachante", valor: 100.00, selecionado: false },
        { nome: "Despachante", valor: 150.00, selecionado: false },
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
        // Filtramos apenas os objetos que têm 'selecionado: true'
        const selecionados = servicos.filter(s => s.selecionado);

        if (selecionados.length === 0) return "Nenhum serviço selecionado.";

        let texto = "*Orçamento:*\n\n";
        let total = 0;

        selecionados.forEach(s => {
            // Formata o número para o padrão brasileiro (ex: 10,00)
            const valorFormatado = s.valor.toFixed(2).replace('.', ',');
            texto += ` ${s.nome}: R$ ${valorFormatado}\n`;
            total += s.valor; // Soma ao acumulador
        });

        // Adiciona o total no final da string
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

    function setarValoresAproximados() {

        const novosServicos = [...servicos];
        novosServicos.forEach((s) => {

        if (s.valorAprox > 0) {
            s.valor = s.valorAprox;
        }
    });

        setServicos(novosServicos);
    }

    return (
        <div>
            <Header />
            <form className={styles.formOrcamento}>
                <h2>Orçamento de Serviços</h2>

                <button type="button" onClick={setarValoresAproximados}>Usar valores Aproximados</button>

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
                            value={s.valor}
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