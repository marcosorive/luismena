import { Button } from "../button";

import styles from './regalaLuzHeader.module.scss'

interface FeatureProps {
    title: string,
    description: string
}

function Feature({ title, description }: FeatureProps) {
    return (
        <div className={styles["feature--wrapper"]}>
            <div className={styles["feature--title"]}>{title}</div>
            <hr className={styles["feature--divider"]} />
            <div className={styles["feature--description"]}>{description}</div>
        </div>
    )
}

const features: Array<FeatureProps> = [
    { title: "Papel fotográfico", description: "Epson Fine Velvet Art de 260 g/m2, libre de ácido." },
    { title: "Peana", description: "De vinilo reciclado para la ocasión." },
    { title: "Impresión de altísima calidad", description: "A base de pigmentos minerales que garantizan la estabilidad de la imagen en el tiempo." },
    { title: "Entrega", description: "Perfectamente protegida y embalada." },
    { title: "Bombilla", description: "Compatible con bombillas normales o bombilla con mando de infrarrojos con el que podrás regular a distancia la intensidad y los colores." },
]

export function RegalaLuzHeader() {
    return <div className={styles["regala-luz-wrapper"]}>
        <div className={styles["regala-luz-container"]}>
            <div className={styles["header--container"]}>
                <div className={styles["header--left"]}>
                    <div className={styles["header--title"]}>Fotografías creativas de Luis Mena en soportes de luz</div>
                    <Button text="Reserva" />
                </div>
                <div className={styles["header--right"]}>
                    <img className={styles["header--image"]} src="https://estudioluismena.com/wp-content/uploads/2020/10/LMR_6112-gafas-scaled-800x800.jpg" />
                </div>
            </div>
            <div className={styles["feature--container"]}>
                {features.map((f) => <Feature key={f.title} title={f.title} description={f.description} />)}
            </div>
            <hr className={styles["hr-60"]} />
            <div className={styles["price--wrapper"]}>
                <div className={styles["price--container"]}>
                    <div className={styles["price--title"]} >Precio</div>
                    <hr className={styles["price--divider"]} />
                    <div className={styles["price--quantity"]} >100 €</div>
                </div>
            </div>
        </div>
    </div>
}