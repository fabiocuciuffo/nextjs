import Link from "next/link";
export default ({ data }) => {
    data = data.items;
    console.log(data);
    if(!data){
        return
    }
    return (
        <div>
            <p className={"text-2xl"}>repositories :</p>
        {data.map((repo) => {
                return (
                    <p key={repo.name}>{repo.name}</p>
                )
            })}
        </div>
    )
}