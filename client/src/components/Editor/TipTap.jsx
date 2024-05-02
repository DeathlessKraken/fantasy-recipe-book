import { useEditor, EditorContent } from '@tiptap/react';
import Toolbar from './Toolbar';

//Fixed Menu always appears on top.
//Bubble menu appears when selecting text.
//Floating menu appears when you place cursor on empty line.
const placeholder = "<p>Write your post here!</p>";

export default function TipTap (props) {
    const { extensions, onChange } = props;

    const editor = useEditor({
        extensions: extensions, 
        content: placeholder,
        autofocus: true,
        onUpdate: ({editor}) => {
            onChange(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-1 focus:outline-none',
            }
        }
    });

    if(!editor) {
        return null;
    }

    return (
        <>
            <div className='flex flex-col border-2 border-black rounded-lg my-10'>
                <Toolbar editor={editor}/>
                <EditorContent editor={editor} style={{ whiteSpace: "pre-line" }} />
            </div>
        </>
    );
}