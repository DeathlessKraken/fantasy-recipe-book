import { useState } from "react";
import TipTap from "../components/Editor/TipTap";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import CustomRecipeGreen from "../components/CustomRecipeGreen";
import CustomRecipeOrange from "../components/CustomRecipeOrange";

export default function CreateRecipe () {
    const [content, setContent] = useState({});
    const [user, setUser] = useState('ThreeSheets');
    const [inputs, setInputs] = useState({
        customRecipe: false,
        title: 'Preview Title',
        category: 'Meals',
        originalPost: '',
        desc: 'Preview description',
        image: '',
    });
    
    function sanitizeHTML(html) {
        console.log(DOMPurify.sanitize(html));
        return DOMPurify.sanitize(html);
    }
    
    
    function handleContentChange(content) {
        setContent(content);
    }
    
    function handleInputChange(event) {
        setInputs(prevInputs => {
            return (
                {
                    ...prevInputs,
                    [event.target.name]: event.target.value
                }
                );
        });
    }
        
    const extensions = [
        StarterKit,
        Heading.configure({
            HTMLAttributes: {
                class: "text-bold text-3xl"
            }
        }),
        Image,
    ]

    //Parse content to json, render in preview section with tiptap getJSON
        
    //ORIGINAL INQUIRY border should orange if not custom, green/success if yes.

    //Old section style: lg:px-64 xl:px-36 2xl:px-8
    return (
        <section className="w-full flex flex-col mx-auto lg:mb-4">
            <div className="p-4 w-full max-w-xl xl:max-w-2xl mx-auto lg:my-8 lg:rounded-lg">

                <h1 className="text-default font-semibold text-4xl my-6">New Post</h1>

                <div className="flex flex-col text-default gap-6">

                    {
                        (inputs.customRecipe === true || inputs.customRecipe === "true") ? 
                            <CustomRecipeGreen value={inputs} onChange={handleInputChange} /> 
                            : <CustomRecipeOrange value={inputs} onChange={handleInputChange} />
                    }

                    <div className="flex flex-col gap-1 text-default">
                        <label htmlFor="titleInput">Title:</label>
                        <input type="text" id="titleInput" placeholder="Title" 
                            className="input input-ghost focus:outline-slate-600 w-full max-w-sm 
                                active:bg-slate-100 focus:bg-slate-100 !text-default" 
                            name="title"
                            value={inputs.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="categoryInput" className="text-default">Choose a category:</label>
                        <select id="categoryInput" value={inputs.category} onChange={handleInputChange} name="category"
                            className="select select-ghost w-full max-w-sm focus:outline-slate-600
                            active:bg-slate-100 focus:bg-slate-100 !text-default"
                        >
                            <option value="Beverages">Beverages</option>
                            <option value="Appetizers">Appetizers</option>
                            <option value="Meals">Meals</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Bread">Bread</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 text-default">
                        <label htmlFor="descInput">Description:</label>
                        <textarea 
                            className="textarea textarea-ghost textarea-md w-full max-w-lg 
                                focus:outline-slate-600 active:bg-slate-100 focus:bg-slate-100 !text-default" 
                            maxLength={200}
                            placeholder="Recipe description" 
                            id="descInput"
                            name="desc"
                            value={inputs.desc}
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>

                    <div className="flex flex-col gap-1 text-default">
                        <label htmlFor="imageInput">Upload primary image:</label>
                        <input type="file" id="imageInput"
                            className="file-input file-input-ghost focus:outline-slate-600 w-full max-w-sm 
                                active:bg-slate-100 focus:bg-slate-100 !text-default" 
                            name="image"
                            
                        />
                    </div>

                    <TipTap extensions={extensions} onChange={handleContentChange}/>

                </div>

            </div>

            {/* Post Preview */}
            <div className="flex flex-col gap-2 mx-auto w-full max-w-xl my-4 xl:max-w-2xl lg:rounded-lg">
                <h1 className="text-default font-semibold text-xl mt-2">Post Preview</h1>
                <div className="lg:bg-orange-100 p-4 w-full max-w-xl xl:max-w-2xl lg:rounded-lg text-default">

                    {/* Title */}
                    <h1 className="text-default text-3xl">{inputs.title}</h1>

                    {/* Post user info */}
                    <div className="flex flex-col mt-2">
                        <div className="flex flex-col">
                            <h2 className="text-default text-sm">Posted by: <span className="text-info">{user}</span></h2>
                        <p className="text-default text-sm">{"Found in: " + inputs.category}</p>

                        {/* If this is not an origial recipe, this link will appear. */}
                        {
                            (inputs.customRecipe === false || inputs.customRecipe === 'false') &&
                            <p className="link link-info link-hover">Original Post</p>
                        }

                        </div>
                    </div>

                    {/* Short description, no more than 200 chars. */}
                    <p className="italic text-slate-600 my-4">{inputs.desc}</p>

                    {/* User is required to upload primary image. */}
                    {
                        !inputs.image ? <p><i>Image goes here</i></p>
                            : <img src={inputs.image} alt="" />
                    }
                    

                    {content.content && parse(sanitizeHTML(generateHTML(content, extensions)))}
                </div>
            </div>
        </section>
    );
}