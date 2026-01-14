import { CartItem } from "./cartItemsModel";

export interface Order {
    id: string;
    items:CartItem[];
    total: number;
    date: Date;
    userId?: string;
}