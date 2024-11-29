import Link from "next/link";
export default () => {
    return (
        <div className={"mx-auto w-fit translate-y-1/2 text-center"}>
            <p>Perdu ?</p>
            <Link href={"/"} className={"underline"}>Retour à l'accueil</Link>
        </div>
    )
}