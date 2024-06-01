import { Food } from "./Food";

export class CartItem {
    price: number;

    constructor(public food: Food, public quantity: number) {
        this.price = food.price;
    }
}
