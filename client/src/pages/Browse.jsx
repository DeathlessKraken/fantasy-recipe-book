import FilteredPosts from "../components/FilteredPosts";
import SortUp from "../assets/SortUp.svg";
import SortDown from "../assets/SortDown.svg";
import { useState } from "react";

export default function Browse () {
    //Default ascending sort is normal; A-Z
    const [sortDirection, setSortDirection] = useState('ascending');
    const [sortIcon, setSortIcon] = useState(SortUp);
    const [limits, setLimits] = useState({
        category: "all",
        sort: "popularity",
        time: "all"
    });

    function handleSelectChange(event) {
        setLimits(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    function handleSortChange() {
        if(sortDirection === "ascending") {
            setSortIcon(SortDown);
            setSortDirection('descending');
        } else {
            setSortIcon(SortUp);
            setSortDirection('ascending');
        }
    }

    return (
        <section className="max-w-7xl flex flex-col mx-auto p-8 lg:px-64 xl:px-36 2xl:px-8">
            <div className="flex justify-between xl:px-16 mb-4 items-start gap-4 xl:gap-0 flex-col xl:items-end xl:flex-row">
                <h1 className="text-default font-semibold text-4xl lg:text-5xl">Browse Recipes</h1>
                
                <div className="flex flex-col sm:flex-row gap-4 min-w-fit my-4 xl:my-0">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="browseSelect" className="text-default">Browse by:</label>
                        <select id="browseSelect" defaultValue={0} className="select select-bordered select-ghost w-full max-w-sm focus:outline-slate-600
                            active:bg-slate-100 focus:bg-slate-100 !text-default"
                            value={limits.category} name="category" onChange={handleSelectChange}>
                          <option value="all">All</option>
                          <optgroup label="Category">
                            <option value="beverages">Beverages</option>
                            <option value="appetizers">Appetizers</option>
                            <option value="meals">Meals</option>
                            <option value="desserts">Desserts</option>
                            <option value="bread">Bread</option>
                            <option value="other">Other</option>
                          </optgroup>
                        </select>
                    </div>

                    <div className="flex items-end gap-4 flex-wrap">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="sortSelect" className="text-default">Sort:</label>
                            <select id="sortSelect" defaultValue={0} className="select select-bordered select-ghost w-full max-w-xs focus:outline-slate-600
                            active:bg-slate-100 focus:bg-slate-100 !text-default"
                                value={limits.sort} name="sort" onChange={handleSelectChange}>
                              <option value="popularity">Popularity</option>
                              <option value="alphabetical">Alphabetical (A-Z)</option>
                              <option value="date">Date Posted</option>
                            </select>
                        </div>

                        <div className="flex items-end gap-1">
                            <div className="flex flex-col gap-1">
                                <select id="timeSelect" defaultValue={0} className="select select-bordered select-ghost w-full max-w-xs focus:outline-slate-600
                                active:bg-slate-100 focus:bg-slate-100 !text-default"
                                    value={limits.time} name="time" onChange={handleSelectChange}>
                                  <option value="all">All Time</option>
                                  <option value="year">This Year</option>
                                  <option value="month">This Month</option>
                                  <option value="week">This Week</option>
                                </select>
                            </div>
                            <img onClick={handleSortChange} className="w-10 h-10 m-1 cursor-pointer" src={sortIcon} alt={`sort order button, ${sortDirection}`} />
                        </div>
                    </div>
                </div>
            </div>
            <FilteredPosts queries={limits} sortDirection={sortDirection}/>
        </section>
    );
}