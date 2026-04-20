import { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Header from "../../components/Header";
import ModeloProcuracao from "../../components/ModeloProcuracao";
import styles from "./ProcuracaoPage.module.css";

export default function ProcuracaoPage() {
    const [nomeOrtorgante, setNomeOrtorgante] = useState("");
    const [cpfOrtorgante, setCpfOrtorgante] = useState("");
    const [enderecoOrtorgante, setEnderecoOrtorgante] = useState("");
    const [rgOrtorgante, setRgOrtorgante] = useState("");
    const [orgaoEmissorOrtorgante, setOrgaoEmissorOrtorgante] = useState("");
    const [CepOrtorgante, setCepOrtorgante] = useState("");
    const [bairroOrtorgante, setBairroOrtorgante] = useState("");
    const [numeroOrtorgante, setNumeroOrtorgante] = useState("");
    const [cidadeOrtorgante, setCidadeOrtorgante] = useState("");
    const [UfOrtorgante, setUfOrtorgante] = useState("PE");
    const [placaVeiculo, setPlacaVeiculo] = useState("");
    const [marcaModeloVeiculo, setMarcaModeloVeiculo] = useState("");
    const [renavamVeiculo, setRenavamVeiculo] = useState("");
    const [chassiVeiculo, setChassiVeiculo] = useState("");
    const [descricaoServicos, setDescricaoServicos] = useState("Assinar pelo proprietário comprador, Assinar pelo proprietário vendedor , Transferência, Inclusão/Baixa de gravame, Solicitar ATPV, Segunda Via do CRV, Primeiro Emplacamento. ");

    const buscarCep = async (textoDigitado) => {
        setCepOrtorgante(textoDigitado);

        const cepLimpo = textoDigitado.replace(/[^0-9]/g, '');

        if (cepLimpo.length == 8) {
            try {
                const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const dados = await resposta.json();

                if (dados.erro) {
                    // CORREÇÃO: Usando o alert nativo da web
                    alert('Erro: CEP inexistente.');
                    return;
                }

                setEnderecoOrtorgante(dados.logradouro);
                setBairroOrtorgante(dados.bairro);
                setCidadeOrtorgante(dados.localidade);
                setUfOrtorgante(dados.uf);

            } catch (error) {
                // CORREÇÃO: Usando o alert nativo da web
                alert('Erro: Houve um problema ao buscar o CEP');
            }
        }
    };
    // Verifica se todos os campos têm algum texto antes de liberar o PDF
    const formularioValido = nomeOrtorgante && cpfOrtorgante && enderecoOrtorgante && rgOrtorgante && orgaoEmissorOrtorgante && CepOrtorgante && bairroOrtorgante && numeroOrtorgante && cidadeOrtorgante && UfOrtorgante;

    return (
        <div>
            <Header />

            <form className={styles.containerForm}>
                <h1>Procuração particular (Específica para serviços de Veículos)</h1>

                <h2>Dados do Ortorgante</h2>

                <div className={styles.rowForm}>
                    <div className={styles.inputGroup + ' ' + styles.flex2}>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" value={nomeOrtorgante} onChange={(e) => setNomeOrtorgante(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.flex1}>
                        <label htmlFor="rg">RG:</label>
                        <input type="text" id="rg" name="rg" value={rgOrtorgante} onChange={(e) => setRgOrtorgante(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.flex1}>
                        <label htmlFor="orgaoEmissor">Órgão Emissor:</label>
                        <input type="text" id="orgaoEmissor" name="orgaoEmissor" value={orgaoEmissorOrtorgante} onChange={(e) => setOrgaoEmissorOrtorgante(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.flex2}><label htmlFor="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf" value={cpfOrtorgante} onChange={(e) => setCpfOrtorgante(e.target.value)} />
                    </div>
                </div>

                <div className={styles.rowForm}>
                    <div className={styles.inputGroup + ' ' + styles.flex1}>
                        <label htmlFor="cep">CEP:</label>
                        <input type="text" id="cep" name="cep" value={CepOrtorgante} onChange={(e) => buscarCep(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.flex2}>
                        <label htmlFor="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" value={enderecoOrtorgante} onChange={(e) => setEnderecoOrtorgante(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.flex1}>
                        <label htmlFor="numero">Número:</label>
                        <input type="text" id="numero" name="numero" value={numeroOrtorgante} onChange={(e) => setNumeroOrtorgante(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup + ' ' + styles.flex1}>
                        <label htmlFor="bairro">Bairro:</label>
                        <input type="text" id="bairro" name="bairro" value={bairroOrtorgante} onChange={(e) => setBairroOrtorgante(e.target.value)} />
                    </div>
                </div>

                <div className={styles.rowForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cidade">Cidade:</label>
                        <input type="text" id="cidade" name="cidade" value={cidadeOrtorgante} onChange={(e) => setCidadeOrtorgante(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="uf">UF:</label>
                        <select id="uf" name="uf" value={UfOrtorgante} onChange={(e) => setUfOrtorgante(e.target.value)}>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</	option>
                            <option value="RN">RN</	option>
                            <option value="RS">RS</	option>
                            <option value="RO">RO</	option>
                            <option value="RR">RR</	option>
                            <option value="SC">SC</	option>
                            <option value="SP">SP</	option>
                            <option value="SE">SE</	option>
                        </select>
                    </div>
                </div>

                <h2>Dados do veículo</h2>

                <div className={styles.rowForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="placa">Placa:</label>
                        <input type="text" id="placa" name="placa" value={placaVeiculo} onChange={(e) => setPlacaVeiculo(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="Renavam">Renavam:</label>
                        <input type="text" id="Renavam" name="Renavam" value={renavamVeiculo} onChange={(e) => setRenavamVeiculo(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="marcaModelo">Marca / Modelo:</label>
                        <input type="text" id="marcaModelo" name="marcaModelo" value={marcaModeloVeiculo} onChange={(e) => setMarcaModeloVeiculo(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="chassi">Chassi:</label>
                        <input type="text" id="chassi" name="chassi" value={chassiVeiculo} onChange={(e) => setChassiVeiculo(e.target.value)} />
                    </div>
                </div>


                <label style={{ marginTop: '20px' }} htmlFor="descricaoServicos">Com poderes de representação junto ao DETRAN-PE e/ou CIRETRANs com fins específicos para realizar os seguintes serviços:</label>
                <textarea className={styles.textDescServicos} id="descricaoServicos" name="descricaoServicos" value={descricaoServicos} onChange={(e) => setDescricaoServicos(e.target.value)} />


                <div style={{ marginTop: '20px' }}>
                    {!formularioValido ? (
                        <PDFDownloadLink
                            document={<ModeloProcuracao nomeOrtorgante={nomeOrtorgante} cpfOrtorgante={cpfOrtorgante} enderecoOrtorgante={enderecoOrtorgante} rgOrtorgante={rgOrtorgante} orgaoEmissorOrtorgante={orgaoEmissorOrtorgante} CepOrtorgante={CepOrtorgante} bairroOrtorgante={bairroOrtorgante} numeroOrtorgante={numeroOrtorgante} cidadeOrtorgante={cidadeOrtorgante} UfOrtorgante={UfOrtorgante} descricaoServicos={descricaoServicos} placaVeiculo={placaVeiculo} marcaModeloVeiculo={marcaModeloVeiculo} renavamVeiculo={renavamVeiculo} chassiVeiculo={chassiVeiculo} />}
                            fileName="procuracao_cliente.pdf"
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '10px 15px',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                display: 'inline-block'

                            }}
                        >
                            {({ loading }) => (loading ? 'Gerando documento...' : 'Baixar Procuração')}
                        </PDFDownloadLink>
                    ) : (
                        <button className="meu-botao" disabled style={{
                            backgroundColor: '#70b1f7',
                            color: '#EEE',
                            padding: '10px 15px',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            display: 'inline-block',
                            cursor: 'not-allowed'
                        }}>
                            Baixar Procuração
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}