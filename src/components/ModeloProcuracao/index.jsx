import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import logoDetran from '../../img/logo-Detran-PE-Grande.png';
import logoPernambuco from '../../img/logo-Governo_Pernambuco.png';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        display: 'flex',
        flexDirection: 'column',
    },
    // CABEÇALHO
    headerProcuracao: {
        backgroundColor: '#011240',
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'row', // Mudado para organizar as logos diretamente
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
    },
    iconDetran: { width: 150, height: 50 },
    iconPernambuco: { width: 60, height: 50 },

    // BORDAS COLORIDAS
    headerBorder: {
        display: 'flex',
        flexDirection: 'row',
        // Removido o marginTop: 100 daqui para evitar bugs de layout
    },
    corAzul: { backgroundColor: '#0044ff', height: 3, width: '25%' },
    corAmarela: { backgroundColor: '#ffeb3b', height: 3, width: '25%' },
    corVermelha: { backgroundColor: '#ff0000', height: 3, width: '25%' },
    corVerde: { backgroundColor: '#4CAF50', height: 3, width: '25%' },

    // CORPO DO DOCUMENTO
    containerProcuracao: {
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        flex: 1, // NOVO: Faz o conteúdo central ocupar todo o espaço restante empurrando o footer
    },
    titulo: { fontSize: 14, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    subTitulo: { fontSize: 14, marginVertical: 10, fontWeight: 'bold' },
    text: { fontSize: 12, marginBottom: 5 },
    paragraph: { fontSize: 12, marginTop: 15, lineHeight: 1.5, textAlign: 'justify' },
    groupRow: { display: 'flex', flexDirection: 'row', gap: 10 },
    groupOutorgados: { marginBottom: 10 },

    // ASSINATURA
    rowAssinatura: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50, // Adicionado um respiro antes da assinatura
    },
    textAssinatura: { fontSize: 12 },
    // NOVO: Estilo movido do inline para o StyleSheet
    labelAssinatura: {
        textAlign: 'right',
        fontSize: 12,
        marginRight: 45,
        marginTop: 3,
        color: '#333'
    },

    // RODAPÉ
    footer: { backgroundColor: '#EEE', textAlign: 'center' },
    footerTitle: { fontSize: 12, fontWeight: 'bold', marginVertical: 10 },
    footerText: { fontSize: 10, marginBottom: 5 },
});

// NOVO: Mini-componente para evitar repetição de código das listras coloridas
const BordaColorida = () => (
    <View style={styles.headerBorder}>
        <View style={styles.corAzul}></View>
        <View style={styles.corVerde}></View>
        <View style={styles.corAmarela}></View>
        <View style={styles.corVermelha}></View>
    </View>
);

export default function ModeloProcuracao({ nomeOrtorgante, cpfOrtorgante, enderecoOrtorgante, rgOrtorgante, orgaoEmissorOrtorgante, CepOrtorgante, bairroOrtorgante, numeroOrtorgante, cidadeOrtorgante, UfOrtorgante, descricaoServicos, placaVeiculo, marcaModeloVeiculo, renavamVeiculo, chassiVeiculo }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* 1. Cabeçalho Azul com Logos */}
                <View style={styles.headerProcuracao}>
                    <Image style={styles.iconDetran} source={logoDetran} />
                    <Image style={styles.iconPernambuco} source={logoPernambuco} />
                </View>

                {/* 2. Listra Colorida Topo */}
                <BordaColorida />

                {/* 3. Corpo Principal (Ocupa todo o espaço do meio com flex: 1) */}
                <View style={styles.containerProcuracao}>
                    <View>
                        <Text style={styles.titulo}>PROCURAÇÃO PARTICULAR (Específica para serviços de Veículos)</Text>

                        <Text style={styles.subTitulo}>OUTORGANTE (Proprietário do Veículo)</Text>
                        <Text style={styles.text}>Nome: {nomeOrtorgante}</Text>

                        <View style={styles.groupRow}>
                            <Text style={styles.text}>RG: {rgOrtorgante}</Text>
                            <Text style={styles.text}>Órgão Emissor: {orgaoEmissorOrtorgante}</Text>
                            <Text style={styles.text}>CPF: {cpfOrtorgante}</Text>
                        </View>

                        <View style={styles.groupRow}>
                            <Text style={styles.text}>Endereço: {enderecoOrtorgante}</Text>
                            <Text style={styles.text}>Número: {numeroOrtorgante}</Text>
                            <Text style={styles.text}>CEP: {CepOrtorgante}</Text>
                        </View>

                        <View style={styles.groupRow}>
                            <Text style={styles.text}>Bairro: {bairroOrtorgante}</Text>
                            <Text style={styles.text}>Cidade: {cidadeOrtorgante}</Text>
                            <Text style={styles.text}>UF: {UfOrtorgante}</Text>
                        </View>

                        <Text style={styles.subTitulo}>OUTORGADOS (Procurador Legal)</Text>

                        <View style={styles.groupOutorgados}>
                            <Text style={styles.text}>Nome: JOSÉ ANDRÉ DE FRANÇA BEZERRA</Text>
                            <Text style={styles.text}>RG: 5567809 Org. Emissor: SDS/PE CPF: 027.117.514-14</Text>
                        </View>

                        <View style={styles.groupOutorgados}>
                            <Text style={styles.text}>Nome: SEBASTIANA TENORIO CAVALCANTE FRANÇA</Text>
                            <Text style={styles.text}>RG: 6652222 Org. Emissor: SDS/PE CPF: 046.721.994-01 </Text>
                        </View>

                        <View style={styles.groupOutorgados}>
                            <Text style={styles.text}>Nome: LUCAS CAMPOS DE FRANÇA </Text>
                            <Text style={styles.text}>RG: 9382090 Org. Emissor: SDS/PE CPF: 096.141.384-08</Text>
                        </View>

                        <View style={styles.groupOutorgados}>
                            <Text style={styles.text}>ENDEREÇO: AV: Gumercino Cavalvante 840 LOJA 03 </Text>
                            <Text style={styles.text}>BAIRRO: SÃO CRISTOVÃO CIDADE: ARCOVERDE UF: PE </Text>
                        </View>

                        <Text style={styles.subTitulo}>Dados do Veículo</Text>

                        <View style={styles.groupRow}>
                            <Text style={styles.text}>Placa: {placaVeiculo}</Text>
                            <Text style={styles.text}>Marca/Modelo: {marcaModeloVeiculo}</Text>
                        </View>

                        <View style={styles.groupRow}>
                            <Text style={styles.text}>Renavam: {renavamVeiculo}</Text>
                            <Text style={styles.text}>Chassi: {chassiVeiculo}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize: 10, fontWeight: 'bold', marginTop: 20}}>Assinar Individualmente com poderes de representação junto ao DETRAN-PE e/ou CIRETRANs com fins específicos para realizar os seguintes serviços: </Text>
                            <Text style={{fontSize: 10, marginTop: 5}}>{descricaoServicos}</Text>
                        </View>

                    </View>

                    {/* Bloco de Assinatura fica no final do corpo principal */}
                    <View>
                        <View style={styles.rowAssinatura}>
                            <Text style={styles.textAssinatura}>______________, ___ de ___________ de ______.</Text>
                            <Text style={styles.textAssinatura}>______________________________</Text>
                        </View>
                        <Text style={styles.labelAssinatura}>Assinatura do Outorgante</Text>
                    </View>
                </View>

                {/* 4. Rodapé fixo na base */}
                <View>
                    {/* Reutilizando a listra colorida */}
                    <BordaColorida />
                    <View style={styles.footer}>
                        <Text style={styles.footerTitle}>Departamento Estadual de Trânsito de Pernambuco - CNPJ -09.753.781/0001-60</Text>
                        <Text style={styles.footerText}>Estrada do Barbalho, 889 - Iputinga - Recife - PE CEP 50.690-900 </Text>
                        <Text style={styles.footerText}>PABX: (81) 3184-8000</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
}