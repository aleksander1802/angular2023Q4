export interface CustomCardFormValue {
    title: string;
    description?: string;
    imageLink: string;
    videoLink: string;
    creationDate: string;
    tags: {
        tag: string;
    }[];
}
