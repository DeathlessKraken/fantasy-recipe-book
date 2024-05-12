import Posts from "../components/Posts";
import SortUp from "../assets/SortUp.svg";
import SortDown from "../assets/SortDown.svg";
import { useState } from "react";

export default function Browse () {
    //Default ascending sort is normal; A-Z
    const [sortDirection, setSortDirection] = useState('ascending');
    const [sortIcon, setSortIcon] = useState(SortUp);

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
                        <select id="browseSelect" defaultValue={0} className="select select-ghost w-full max-w-sm focus:outline-slate-600
                            active:bg-slate-100 focus:bg-slate-100 !text-default">
                          <option>All</option>
                          <optgroup label="Category">
                            <option>Beverages</option>
                            <option>Appetizers</option>
                            <option>Meals</option>
                            <option>Desserts</option>
                            <option>Bread</option>
                            <option>Other</option>
                          </optgroup>
                        </select>
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="sortSelect" className="text-default">Sort:</label>
                            <select id="sortSelect" defaultValue={0} className="select select-ghost w-full max-w-xs focus:outline-slate-600
                            active:bg-slate-100 focus:bg-slate-100 !text-default">
                              <option>Alphabetical (A-Z)</option>
                              <option>Popularity</option>
                              <option>Date Posted</option>
                            </select>
                        </div>

                        <div className="flex items-end gap-1">
                            <div className="flex flex-col gap-1">
                                <select id="timeSelect" defaultValue={0} className="select select-ghost w-full max-w-xs focus:outline-slate-600
                                active:bg-slate-100 focus:bg-slate-100 !text-default">
                                  <option>All Time</option>
                                  <option>This Year</option>
                                  <option>This Month</option>
                                  <option>This Week</option>
                                </select>
                            </div>
                            <img onClick={handleSortChange} className="w-10 h-10 m-1 cursor-pointer" src={sortIcon} alt={`sort order button, ${sortDirection}`} />
                        </div>
                    </div>
                </div>
            </div>
            <Posts />
        </section>
    );
}