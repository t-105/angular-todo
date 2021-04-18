export class Todo {
    title: string;
    content: string;
    duedate: string;
    itemTags: Tags[];
    completed: boolean;
}

export class Tags {
    id: number;
    name: string;
    isSelected: boolean;
}