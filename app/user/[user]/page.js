import {githubRequest} from "@/helpers/helpers";
import {redirect} from "next/navigation";
import InfosSection from "@/components/user/InfosSection";
import ReposList from "@/components/user/ReposList";
export default async function Page({ params }) {
    const user = (await params).user
    if(user === ""){
        redirect("/");
    }
    let path1 = `/users/${user}`;
    let path2 = `/search/repositories?q=user:${user}`;
    let data1 = await githubRequest(path1);
    let data2 = await githubRequest(path2);
    return (
        <>
            <div>{user}</div>
            <InfosSection data={data1}/>
            <ReposList data={data2}/>
        </>)
}