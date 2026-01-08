import { Link } from "react-router-dom"
import styles from './Header.module.css';
import logo from "../../img/IconHubDespachante.png";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link className={styles.containerLogo} to={"/"}>
                <img className={styles.logo} src={logo} alt="IconHubDespachante" />
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

