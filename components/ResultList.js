import Link from "next/link";
export default ({data}) => {
    console.log(data);
    if(data?.length === 0){
        return (
            <div className={"text-center"}>
                <p>Aucun résultat, essayez autre chose.</p>
            </div>
        )
    }
    if(!data){
        return (
            <div className={"text-center"}>
                <p>Faites une recherche, les résultats apparaitront ici.</p>
            </div>
        )
    }
    return (
        <div className={"w-fit flex flex-col items-start justify-start mx-auto"}>
            {data.map((item) => {
                return (<div key={item.value} className={"w-fit"}><Link href={item.type === "user" ? "/user/" + item.url : "/repo/"  + item.url} >{item.value}</Link></div>)
            })}
        </div>
    )
}