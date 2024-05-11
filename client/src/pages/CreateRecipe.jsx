import { useState } from "react";
import TipTap from "../components/Editor/TipTap";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Plus, Minus } from "lucide-react";

import CustomRecipeGreen from "../components/CustomRecipeGreen";
import CustomRecipeOrange from "../components/CustomRecipeOrange";
import { useParams } from "react-router-dom";

//Testing
import data from "../data";

export default function CreateRecipe (props) {
    const { edit } = props;
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState({});
    const [user, setUser] = useState('ThreeSheets');
    const [inputs, setInputs] = useState({
        customRecipe: false,
        title: '',
        category: 'Meals',
        originalPost: '',
        desc: '',
        image: '',
        prepTime: 0,
        cookTime: 0,
        servings: 0,
        ingredients: {
            ingredient1: ""
        },
        instructions: {
            step1: ""
        }
    });

    if(edit && !isEdit) {
        //Modify for production, dummy data is incomplete so I'm manually setting missing fields.
        //When loading actual previous data, a lot of this will change.
        setIsEdit(true);
        setContent({
            "type": "doc",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": `${data[id].body}`
                  }
                ]
              }
            ]
        });
        setInputs({
            customRecipe: true,
            title: data[id].title,
            category: 'Beverages',
            originalPost: "",
            desc: data[id].description,
            image: data[id].media,
            prepTime: data[id].prep_time_mins,
            cookTime: data[id].cook_time_mins,
            servings: data[id].servings,
            ingredients: Object.fromEntries(data[id].ingredients.map((item, idx) => {
                return (
                    [
                        `ingredient${idx + 1}`, item
                    ]
                );
            })),
            instructions: Object.fromEntries(data[id].instructions.map((item, idx) => {
                return (
                    [
                        `step${idx + 1}`, item
                    ]
                );
            })),
        })
    }
    
    function sanitizeHTML(html) {
        return DOMPurify.sanitize(html);
    }
    
    
    function handleContentChange(content) {
        setContent(content);
    }
    
    function handleInputChange(event) {
        if(event.target.name.includes("step")) {
            setInputs(prevInputs => {
                return (
                    {
                        ...prevInputs,
                        instructions: {
                            ...prevInputs.instructions,
                            [event.target.name]: event.target.value
                        }
                    }
                );
            });
        } else if(event.target.name.includes("ingredient")) {
            setInputs(prevInputs => {
                return (
                    {
                        ...prevInputs,
                        ingredients: {
                            ...prevInputs.ingredients,
                            [event.target.name]: event.target.value
                        }
                    }
                );
            });
        }
         else {
            setInputs(prevInputs => {
                return (
                    {
                        ...prevInputs,
                        [event.target.name]: event.target.value
                    }
                );
            });
        }
    }

    function handleButtonClick (category, type, idx) {
        if(category === "ingredient") {
            if(type === "add") {
                setInputs(prevInputs => {
                    return ({
                        ...prevInputs,
                        ingredients: {
                            ...prevInputs.ingredients,
                            [`ingredient${idx + 2}`]: ""
                        }
                    });
                })
            } else {
                setInputs(prevInputs => {
                    delete prevInputs.ingredients[`ingredient${idx + 1}`];
                    return ({
                        ...prevInputs,
                    });
                })
            }
        } else {
            if(type === "add") {
                setInputs(prevInputs => {
                    return ({
                        ...prevInputs,
                        instructions: {
                            ...prevInputs.instructions,
                            [`step${idx + 2}`]: ""
                        }
                    });
                })
            } else {
                setInputs(prevInputs => {
                    delete prevInputs.instructions[`step${idx + 1}`];
                    return ({
                        ...prevInputs,
                    });
                })
            }
        }
    }

    {/* Function to strikethrough labels on ingredient preview */}
    function handleIngredientCheckbox(itemIdx) {
        const item = document.getElementById(`desc${itemIdx}`);

        if(item.style.textDecorationLine === "" || item.style.textDecorationLine === "none") {
            item.setAttribute("style", "text-decoration-line: line-through");
        } else {
            item.setAttribute("style", "text-decoration-line: none");
        }
    }

    const extensions = [
        StarterKit.configure({
            heading: {
                HTMLAttributes: {
                    class: "text-bold text-3xl"
                }
            },
            paragraph: {
                HTMLAttributes: {
                    class: "min-h-[1rem]"
                }
            }
        }),
        Image.configure({
            HTMLAttributes: {
                class: "max-w-[20rem] rounded-lg"
            }
        }),
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
                            maxLength={60}
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
                            maxLength={300}
                            rows={3}
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

                    <TipTap extensions={extensions} onChange={handleContentChange} editContent={isEdit && content}/>

                    {/* Input for prep time, cook time, servings */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                        <div className="flex flex-col gap-1 text-default">
                            <label htmlFor="prepTimeInput">Prep time (mins):</label>
                            <input type="number" id="prepTimeInput" 
                                className="input input-ghost focus:outline-slate-600 w-20
                                active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                name="prepTime"
                                value={inputs.prepTime}
                                onChange={handleInputChange}
                                />
                        </div>

                        <div className="flex flex-col gap-1 text-default">
                            <label htmlFor="cookTimeInput">Cook time (mins):</label>
                            <input type="number" id="cookTimeInput" 
                                className="input input-ghost focus:outline-slate-600 w-20
                                    active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                    name="cookTime"
                                    value={inputs.cookTime}
                                    onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col gap-1 text-default">
                            <label htmlFor="servingsInput">Servings:</label>
                            <input type="number" id="servingsInput" 
                                className="input input-ghost focus:outline-slate-600 w-20
                                    active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                    name="servings"
                                    value={inputs.servings}
                                    onChange={handleInputChange}
                            />
                        </div>


                    </div>

                    {/* Ingredients input */}
                    <div className="flex flex-col gap-2 p-4 border-2 border-slate-500 rounded-lg">
                        {
                            Object.keys(inputs.ingredients).map((step, idx, array) => {
                                return(
                                    <div key={idx} className="flex flex-col gap-1 text-default">
                                        <label htmlFor={`ingredient${idx + 1}`}>{`Ingredient ${idx + 1}`}</label>
                                        <input type="text"
                                            className="input input-ghost input-md leading-normal w-full max-w-sm 
                                                focus:outline-slate-600 active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                            id={`ingredient${idx + 1}`}
                                            maxLength={100}
                                            name={`ingredient${idx + 1}`}
                                            value={inputs.ingredients[`ingredient${idx + 1}`]}
                                            onChange={handleInputChange}
                                        >
                                        </input>

                                        <div className="flex gap-2 mt-2">
                                            {
                                                (idx === array.length - 1) &&
                                                <button className="btn btn-info w-fit" name="ingredient" onClick={() => handleButtonClick('ingredient', 'add', idx)}>
                                                    <Plus/>
                                                </button>
                                            }
                                            {
                                                (idx > 0 && idx === array.length - 1) &&
                                                <button className="btn btn-info w-fit" name="ingredient" onClick={() => handleButtonClick('ingredient', 'subtract', idx)}>
                                                    <Minus />
                                                </button>
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    {/* Instructions input */}
                    <div className="flex flex-col gap-2 p-4 border-2 border-slate-500 rounded-lg">
                        {
                            Object.keys(inputs.instructions).map((step, idx, array) => {
                                return(
                                    <div key={idx} className="flex flex-col gap-1 text-default">
                                        <label htmlFor={`step${idx + 1}`}>{`Step ${idx + 1}`}</label>
                                        <textarea 
                                            className="textarea textarea-ghost textarea-md leading-normal w-full max-w-2xl 
                                                focus:outline-slate-600 active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                            maxLength={500}
                                            rows={4}
                                            id={`step${idx + 1}`}
                                            name={`step${idx + 1}`}
                                            value={inputs.instructions[`step${idx + 1}`]}
                                            onChange={handleInputChange}
                                        >
                                        </textarea>

                                        <div className="flex gap-2 mt-2">
                                            {
                                                (idx === array.length - 1) &&
                                                <button className="btn btn-info w-fit" name="instruction" onClick={() => handleButtonClick('instruction', 'add', idx)}>
                                                    <Plus/>
                                                </button>
                                            }
                                            {
                                                (idx > 0 && idx === array.length - 1) &&
                                                <button className="btn btn-info w-fit" name="instruction" onClick={() => handleButtonClick('instruction', 'subtract', idx)}>
                                                    <Minus />
                                                </button>
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                </div>

            </div>

            {/* Post Preview */}
            <div className="flex flex-col p-4 lg:p-0 gap-2 mx-auto w-full max-w-xl my-4 xl:max-w-2xl lg:rounded-lg">
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
                            : <img src={inputs.image} alt="" className="m-auto w-fit h-fit rounded-lg overflow-hidden" />
                    }
                    
                    <div className="my-4">
                        {content.content && parse(sanitizeHTML(generateHTML(content, extensions)))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-center my-4">
                        <div className="stats stats-horizontal mt-4 sm:mt-0 self-center bg-slate-200 text-slate-700 text-xs w-64 sm:w-fit">
                          <div className="stat">
                            <div className="stat-title text-slate-700 font-semibold">Prep Time</div>
                            <div className="stat-value">{inputs.prepTime | 0}</div>
                            <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                          </div>

                          <div className="stat">
                            <div className="stat-title text-slate-700 font-semibold">Cook Time</div>
                            <div className="stat-value">{inputs.cookTime | 0}</div>
                            <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                          </div>
                        </div>

                        <div className="stats stats-horizontal mb-4 sm:mb-0 self-center bg-slate-200 text-slate-700 text-xs w-64 sm:w-fit">
                            <div className="stat">
                              <div className="stat-title text-slate-700 font-semibold">Total Time</div>
                              <div className="stat-value">{Number.parseInt(inputs.prepTime) + Number.parseInt(inputs.cookTime) | 0 }</div>
                              <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                            </div>

                            <div className="stat">
                              <div className="stat-title text-slate-700 font-semibold">Servings</div>
                              <div className="stat-value">{inputs.servings | 0}</div>
                              <div className="stat-desc h-[1rem]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Only show on preview if first object key is not blank */}
                    {
                        Object.values(inputs.ingredients)[0] !== "" &&
                        <div className="flex flex-col gap-2 text-default">
                            {
                                Object.values(inputs.ingredients).map((item, idx) => {
                                    return (
                                        <div key={idx} className="flex gap-1">
                                            <input type="checkbox" id={"item" + idx} className="checkbox checkbox-info" onClick={() => handleIngredientCheckbox(idx)}/>
                                            <label htmlFor={"item" + idx} id={"desc" + idx}>{item}</label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }

                    {/* Only show on preview if first object key is not blank */}
                    {
                        Object.values(inputs.instructions)[0] !== "" &&
                        <ol type="1" className="text-default list-decimal px-4">
                            {
                                Object.values(inputs.instructions).map((item, idx) => {
                                    return (
                                        <li key={idx} className="my-4">
                                            {item}
                                        </li>
                                    );
                                })
                            }
                        </ol>
                    }

                </div>

                {/* Submit recipe */}
                <div className="flex justify-start w-full">
                        <button className="btn btn-accent">Submit Recipe</button>
                </div>

            </div>

        </section>
    );
}