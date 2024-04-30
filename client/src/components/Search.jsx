import { useState } from "react";
import { Form } from "react-router-dom"

export default function Search() {
    const [searchInput, setSearchInput] = useState('');

    //Don't want to submit if search is empty.
    function handleSubmit(event) {
        if(searchInput.length < 1) {
            event.preventDefault();
            
            //POP TOAST SAYING SEARCH IS EMPTY.
        } else {
            document.getElementById('searchForm').submit()
        }
    }

    function handleChange(event) {
        setSearchInput(event.target.value);
    }

    return (
        <label className="input input-bordered flex items-center gap-2 max-w-96 lg:max-w-none text-default bg-slate-300 active:!bg-transparent">
            <Form onSubmit={handleSubmit} id="searchForm" method="GET" action="/search/" autoComplete="off" className="flex w-full items-center">
                <input name="query" value={searchInput} onChange={handleChange} type="text" className="grow placeholder-slate-500 active:!bg-transparent" placeholder="Search" />
                <svg onClick={handleSubmit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </Form>
        </label>
    );
}