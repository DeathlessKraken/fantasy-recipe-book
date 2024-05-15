export default function CustomRecipeOrange (props) {
    const { onChange, value } = props;

    return (
        <div className="flex flex-col gap-1 text-default py-6 px-2 outline items-center rounded-lg outline-warning">
            <p className="text-xl font-semibold mb-4 text-center">Is this a custom recipe, with your own special twist?</p>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input type="radio" id="customInputNo" name="is_personal"
                        className="radio radio-primary selected" 
                        defaultChecked
                        value={false}
                        onChange={onChange}
                        />
                    <label htmlFor="customInputNo"><span className="font-bold">No</span>, this is not my recipe.</label>
                </div>
                <div className="flex gap-2">
                    <input type="radio" id="customInputYes" name="is_personal"
                        className="radio radio-primary selected" 
                        value={true}
                        onChange={onChange}
                    />
                    <label htmlFor="customInputYes"><span className="font-bold">Yes</span>, this recipe has my unique flare!</label>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-default mt-2">
                <label htmlFor="originalURLInput">Please insert link to original author&apos;s post:</label>
                <input type="text" id="originalURLInput" placeholder="URL of original post" 
                    className="input input-ghost focus:outline-slate-600 w-full max-w-sm 
                        active:bg-slate-100 focus:bg-slate-100 !text-default" 
                    name="post_origin"
                    value={value}
                    autoComplete="off"
                    onChange={onChange}
                    maxLength={2048}
                />
            </div>
        </div>
    );
}