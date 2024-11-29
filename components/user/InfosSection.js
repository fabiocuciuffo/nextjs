export default ({ data }) =>{
    return (
        <div className={"flex flex-col"}>
            <img src={data.avatar_url} className={"rounded-full"} width={200} height={200} />
            <p>{data.bio}</p>
            <p>Membre depuis : {(new Date(data.created_at)).toLocaleDateString("fr-FR")}</p>
        </div>
    )
}