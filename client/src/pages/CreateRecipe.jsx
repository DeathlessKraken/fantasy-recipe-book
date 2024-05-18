import { useEffect, useState } from "react";
import TipTap from "../components/Editor/TipTap";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Plus, Minus } from "lucide-react";
import isURL from "validator/lib/isURL";
import toast from "react-hot-toast";
import useSubmitPost from "../hooks/useSubmitPost";

import CustomRecipeGreen from "../components/CustomRecipeGreen";
import CustomRecipeOrange from "../components/CustomRecipeOrange";
import { useAuthContext } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";

//Testing
//import data from "../data";

export default function CreateRecipe (props) {
    const { edit } = props;
    //const { id } = useParams();
    //const [isEdit, setIsEdit] = useState(false);
    const { currentUser, setCurrentUser } = useAuthContext();
    const navigate = useNavigate();
    const {loading, submit} = useSubmitPost();
    const [content, setContent] = useState({});
    const [inputs, setInputs] = useState({
        is_personal: false,
        title: '',
        category: 'Meals',
        post_origin: '',
        description: '',
        media_url: '',
        prep_time: 0,
        cook_time: 0,
        servings: 0,
        ingredients: {
            ingredient1: ""
        },
        instructions: {
            step1: ""
        }
    });

    useEffect(() => {
        if(!currentUser) navigate('/login');
    });

    async function handleSubmit() {
        //Make sure link is proper URI and filled out if NOT personal, max 2048 chars
        if(inputs.is_personal === false || inputs.is_personal === "false") {
            if(!isURL(inputs.post_origin)) {
                toast.error("Original Post link must be a URL.");
                return;
            } else if(inputs.post_origin.length > 2048) {
                toast.error("Original Post URL is too long (2048 characters max.)");
                return;
            }
        }
        //title is filled, min 8, max 60 chars;
        if(!inputs.title) {
            toast.error("Please provide a title.");
            return;
        } else if(inputs.title.length < 5) {
            toast.error("Title must be at least 5 characters long.");
            return;
        }
        //description max 300 chars, not required.
        //primary image is required to be uploaded

        //body max 5000 chars, not required.
        //prep, cook, servings required, min 0 value, at least value 1 required, max 999. required.
        if(inputs.prep_time < 1) {
            toast.error("Prep time must be between 1 and 999.");
            return;
        } else if(inputs.cook_time < 1) {
            toast.error("Cook time must be between 1 and 999.");
            return;
        } else if(inputs.servings < 1) {
            toast.error("Servings must be between 1 and 999.");
            return;
        }
        //ingredients max 25 keys, 100 chars per. one required.
        if(Object.keys(inputs.ingredients).length > 25) {
            toast.error("Ingredients cannot exceed 25 items.");
            return;
        } else if(Object.values(inputs.ingredients)[0].length < 3) {
            toast.error("You provide at least one ingredient.");
            return;
        } else if(Object.values(inputs.ingredients)[Object.values(inputs.ingredients).length - 1].length < 3) {
            toast.error("Please fill out all added ingredients.");
            return;
        }
        //instructions max 25 keys, 500 chars per. one required.
        if(Object.keys(inputs.instructions).length > 25) {
            toast.error("Instructions cannot exceed 25 items.");
            return;
        } else if(Object.values(inputs.instructions)[0].length < 3) {
            toast.error("You provide at least one instruction.");
            return;
        } else if(Object.values(inputs.instructions)[Object.values(inputs.instructions).length - 1].length < 3) {
            toast.error("Please fill out all added instructions.");
            return;
        }

        //Ready to submit
        await submit();
        //Navigate to new post after submission
    }

    /*if(edit && !isEdit) {
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
    }*/
    
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
                if(Object.values(inputs.ingredients)[idx].length < 3){
                    toast.error("Please fill out the previous ingredient.");
                    return;
                } else {
                    setInputs(prevInputs => {
                        return ({
                            ...prevInputs,
                            ingredients: {
                                ...prevInputs.ingredients,
                                [`ingredient${idx + 2}`]: ""
                            }
                        });
                    })
                }
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
                if(Object.values(inputs.instructions)[idx].length < 3){
                    toast.error("Please fill out the previous instruction.");
                    return;
                } else {
                    setInputs(prevInputs => {
                        return ({
                            ...prevInputs,
                            instructions: {
                                ...prevInputs.instructions,
                                [`step${idx + 2}`]: ""
                            }
                        });
                    })
                }
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

    /* Function to strikethrough labels on ingredient preview */
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
        CharacterCount.configure({
            limit: 5000
        })
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
                        (inputs.is_personal === true || inputs.is_personal === "true") ? 
                            <CustomRecipeGreen onChange={handleInputChange} /> 
                            : <CustomRecipeOrange value={inputs.post_origin} onChange={handleInputChange} />
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
                            autoComplete="off"
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
                            name="description"
                            value={inputs.description}
                            onChange={handleInputChange}
                            autoComplete="off"
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

                    <TipTap extensions={extensions} onChange={handleContentChange} />

                    {/* Input for prep time, cook time, servings */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                        <div className="flex flex-col gap-1 text-default">
                            <label htmlFor="prepTimeInput">Prep time (mins):</label>
                            <input type="number" id="prepTimeInput" 
                                className="input input-ghost focus:outline-slate-600 w-20
                                active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                name="prep_time"
                                value={inputs.prep_time}
                                onChange={handleInputChange}
                                autoComplete="off"
                                min={0}
                                max={999}
                            />
                        </div>

                        <div className="flex flex-col gap-1 text-default">
                            <label htmlFor="cookTimeInput">Cook time (mins):</label>
                            <input type="number" id="cookTimeInput" 
                                className="input input-ghost focus:outline-slate-600 w-20
                                    active:bg-slate-100 focus:bg-slate-100 !text-default" 
                                    name="cook_time"
                                    value={inputs.cook_time}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    min={0}
                                    max={999}
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
                                    max={999}
                                    min={0}
                                    autoComplete="off"
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
                                            autoComplete="off"
                                            onChange={handleInputChange}
                                        >
                                        </input>

                                        <div className="flex gap-2 mt-2">
                                            {
                                                (idx === array.length - 1 && Object.keys(inputs.ingredients).length < 25) &&
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
                                            autoComplete="off"
                                            >
                                        </textarea>

                                        <div className="flex gap-2 mt-2">
                                            {
                                                (idx === array.length - 1 && Object.keys(inputs.instructions).length < 25) &&
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
                            <h2 className="text-default text-sm">Posted by: <span className="text-info">{currentUser?.username}</span></h2>
                        <p className="text-default text-sm">{"Found in: " + inputs.category}</p>

                        {/* If this is not an origial recipe, this link will appear. */}
                        {
                            (inputs.is_personal === false || inputs.is_personal === 'false') &&
                            <p className="link link-info link-hover">Original Post</p>
                        }

                        </div>
                    </div>

                    {/* Short description, no more than 200 chars. */}
                    <p className="italic text-slate-600 my-4">{inputs.description}</p>

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
                            <div className="stat-value">{inputs.prep_time | 0}</div>
                            <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                          </div>

                          <div className="stat">
                            <div className="stat-title text-slate-700 font-semibold">Cook Time</div>
                            <div className="stat-value">{inputs.cook_time | 0}</div>
                            <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                          </div>
                        </div>

                        <div className="stats stats-horizontal mb-4 sm:mb-0 self-center bg-slate-200 text-slate-700 text-xs w-64 sm:w-fit">
                            <div className="stat">
                              <div className="stat-title text-slate-700 font-semibold">Total Time</div>
                              <div className="stat-value">{Number.parseInt(inputs.prep_time) + Number.parseInt(inputs.cook_time) | 0 }</div>
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
                    {!loading ? <button className="btn btn-accent" onClick={handleSubmit}>Submit Recipe</button>
                        :   <button className="btn btn-accent">
                                <span className="loading loading-spinner loading-sm"></span>
                            </button>}
                </div>

            </div>

        </section>
    );
}