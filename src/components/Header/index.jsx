import { Link } from "react-router-dom"
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link className={styles.containerLogo}to={"/"}>
            
                <img className={styles.logo} src="./src/img/IconHubDespachante.png" alt="IconHubDespachante" />
                <h1>HubDespachante</h1>
            </Link>
            <nav>
                <ul className={styles.listaHeader}>
                    <li>
                        <Link className={styles.linkLista}
                        to={"/"}
                        >Cadastro</Link>
                    </li>
                    <li>
                        <Link className={styles.linkLista} to={"/orcamento"}>Orçamento</Link>
                    </li>
                    <li>
                        <Link className={styles.linkLista}>Documentos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

