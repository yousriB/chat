export class Food {
    id!: string;
    name!: string;
    price!: number;
    tags?:  string[];
    favorite!: boolean;
    stars!: number;
    image!: string;
    origins!: string[];
    cookTime!: string | string[];
}
