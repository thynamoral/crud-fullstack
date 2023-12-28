export const inputs = [
    {
        id: "firstname",
        name: "firstname",
        type: "text",
        placeholder: "Firstname",
        label: "Firstname",
        pattern: "[a-zA-Z]+",
        required: true
    },
    {
        id: "lastname",
        name: "lastname",
        type: "text",
        placeholder: "Lastname",
        label: "Lastname",
        pattern: "[a-zA-Z]+",
        required: true
    },
    {
        id: "age",
        name: "age",
        type: "number",
        placeholder: "Age",
        label: "Age",
        pattern: "[0-9]+",
        required: true
    },
];

export const genders = [
    {
        id: "male",
        name: "gender",
        type: "radio",
        value: "male",
        required: true,
    },
    {
        id: "female",
        name: "gender",
        type: "radio",
        value: "female",
        required: true,
    },
];

export const interests = [
    {
        id: "video-game",
        name: "interest",
        type: "checkbox",
        value: "video-game",
        label: "Video Game",
    },
    {
        id: "ai",
        name: "interest",
        type: "checkbox",
        value: "artificial-intelligence",
        label: "Artificial Intelligence",
    },
    {
        id: "finance",
        name: "interest",
        type: "checkbox",
        value: "finance",
        label: "Finace",
    },
];