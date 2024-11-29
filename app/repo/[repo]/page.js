import {redirect} from "next/navigation";
import {githubRequest} from "@/helpers/helpers";

export default async function Page({ params }) {
    const repo = decodeURIComponent((await params).repo)
    if(repo === ""){
        redirect("/");
    }
    let path1 = `/repos/${repo}/commits`;
    let path2 = `/repos/${repo}`;
    console.log(path1, path2)
    let data1 = await githubRequest(path1);
    let data2 = await githubRequest(path2);
    console.log(data1, data2)
    return <div>
        <p className={"font-black text-2xl"}>{data2.name}</p>
        <br/>
        <p>{data2.description ? data2.description : "no description"}</p>
        <p>stargazers_count : {data2.stargazers_count}</p>
        <p>watchers : {data2.watchers}</p>
        <p>open issues : {data2.open_issues_count}</p>
        <p>Commits :</p>
        <br/>
        {data1.map((commit) => {
            return (
                <div key={commit.sha}>
                    <p>Date : {(new Date(commit.commit.author.date)).toLocaleDateString("fr-FR")}</p>
                    <p>SHA : {commit.sha}</p>
                    <p>Author : {commit.author.login}</p>
                    <p>Message : {commit.commit.message}</p>
                <br/>
                </div>
            )
        })}
    </div>
}