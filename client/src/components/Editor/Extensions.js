import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";

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

export default extensions;