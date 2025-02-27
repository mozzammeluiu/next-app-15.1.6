// const { UserIcon } = await import("lucide-react");
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: '',
    fields: [
        defineField({
            name:"id",
            type:"string",
        }),
        defineField({
            name:"name",
            type:"string",
        }),
        defineField({
            name:"username",
            type:"string",
        }),
        defineField({
            name:"email",
            type:"string",
        }),
        defineField({
            name:"image",
            type:"string",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "username",
        },
    },
})