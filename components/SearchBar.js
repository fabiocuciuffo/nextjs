'use client';
import {useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default ({category, search}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    category = category === undefined ? category : "all";
    search = search ? search : "";
    const select = useRef(null);
    const searchField = useRef(null);

    function handleClick(e) {
        if(e.key){
            if(e.key !== 'Enter' || e.keyCode !== 13){
                return
            }
        }
        const queryParams = [];
        const selectValue = select.current.value
        const searchValue = searchField.current.value
        if(searchValue === "") return;
        if(selectValue !== "all"){
            queryParams.push({key: "category", value: selectValue})
        } else {
            queryParams.push({key:"category"})
        }
        queryParams.push({key: "search", value: searchValue})
        updateQueryParams(queryParams)
    }

    const updateQueryParams = (newParams) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        newParams.forEach((obj) => {
            if (obj.value !== null && obj.value !== undefined) {
                currentParams.set(obj.key, obj.value);
            } else {
                currentParams.delete(obj.key);
            }
        });

        router.push(`${window.location.pathname}?${currentParams.toString()}`);
    }

    return (
        <div className="flex justify-center items-center my-8">
            <div className="">
                <select ref={select} className="border-l border-t border-b border-t-gray-300 border-b-gray-300 h-10" defaultValue={category}>
                    <option value="all">🔍 All</option>
                    <option value="repository">📁 Repository</option>
                    <option value="user">👤 User</option>
                </select>
                <input
                    onKeyUp={handleClick}
                    ref={searchField}
                    defaultValue={search}
                    className="border-r-gray-300 border-t-gray-300 border-b-gray-300 border-r border-t border-b h-10"
                    type="text"
                    placeholder="Search for a repository or an user…"
                />
            </div>
            <button className="bg-blue-500 rounded-lg p-2 ml-2 hover:bg-blue-700 transition-all" onClick={handleClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </div>
    )
}
