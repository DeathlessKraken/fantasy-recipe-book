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
    });

    if(!editor) {
        return null;
    }

    return (
        <>
            <div className='flex flex-col border-2 border-black rounded-lg'>
              <Toolbar editor={editor}/>
                <EditorContent editor={editor} style={{ padding: "1rem", whiteSpace: "pre-line" }} />
            </div>
        </>
    );
}