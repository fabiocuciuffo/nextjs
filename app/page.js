import SearchBar from "@/components/SearchBar"
import {githubRequest} from "@/helpers/helpers";
import ResultList from "@/components/ResultList";
import {encodeToBase64} from "next/dist/build/webpack/loaders/utils";

export default async function Home(props) {
    const searchParams = await props.searchParams
    let data, data1, data2, search, category;
    if(searchParams?.search){
      category = searchParams.category;
      search = searchParams.search;
      if(category === "repository"){
          let path = `/search/repositories?q=${search}`;
          data = await githubRequest(path);
          data = data.items.map((item) => {
              //https://api.github.com/repos/fabiocuciuffo/tdc-ecv/branches{/branch}
              //https://api.github.com/repos/fabiocuciuffo/tdc-ecv/commits{/sha}
              return {
                  value: item.full_name,
                  url: item.full_name.replaceAll("/", "%2F"),
                  type: "repo"
              }
          });
      } else if(category === "user"){
          let path = `/search/users?q=${search}`;
          data = await githubRequest(path);
          data = data.items.map((item) => {
              return {
                  value: item.login,
                  url: item.login,
                  type: "user"
              }
          });
      } else {
          let path1 = `/search/repositories?q=${search}`;
          let path2 = `/search/users?q=${search}`;
          data1 = await githubRequest(path1);
          data2 = await githubRequest(path2);
          prepareDatasForDisplay(data1, data2);
      }
    }

    function prepareDatasForDisplay(repos, users){
        console.log(repos, users);
        repos = repos.items.map((item) => {
            return {
                value: item.full_name,
                url: item.full_name.replaceAll("/", "%2F"),
                type: "repo"
            }
        });
        users = users.items.map((item) => {
            return {
                value: item.login,
                url: item.login,
                type: "user"
            }
        });
        data = repos.concat(users);
        data.sort(function (a, b) {
            return ('' + a.value).localeCompare(b.value);
        });
    }

    return (<>
      <SearchBar search={search} category={category} />
      <ResultList data={data}/>
    </>)
}
