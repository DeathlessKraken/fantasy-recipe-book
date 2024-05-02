import { useCallback } from "react";
import { 
    Bold,
    Italic,
    Strikethrough,
    RemoveFormatting,
    ArrowDownFromLine,
    Heading1,
    List,
    ListOrdered,
    Quote,
    SquareSplitVertical,
    Undo,
    Redo,
    Image
} from "lucide-react";

//May need to prevent refresh on button click.
export default function Toolbar (props) {
    const { editor } = props;

    const addImage = useCallback(() => {
        const URL = window.prompt('Enter image URL:')
        if(URL) {
            editor.chain().focus().setImage({ src: URL }).run();
        }
    }, [editor]);
    
    if (!editor) return null;

    return (
        <div className="flex gap-5 p-2 border-black border-b-2">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              <Heading1 />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                  !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleItalic()
                  .run()
              }
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <Italic/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .toggleStrike()
                  .run()
              }
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <Strikethrough/>
            </button>
            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
              <ArrowDownFromLine />
            </button>
            <button
              onClick={addImage}
            >
              <Image />
            </button>
            <button 
                onClick={() => {
                    editor.chain().focus().unsetAllMarks().run();
                    editor.chain().focus().clearNodes().run();
                }
            }>
              <RemoveFormatting />
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .undo()
                  .run()
              }
            >
              <Undo />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .redo()
                  .run()
              }
            >
              <Redo />
            </button>
        </div>
    );
}