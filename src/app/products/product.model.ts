// NOTE: if you create a typed model with a custom constructor you CANNOT pass it through ngRx state!
//  you have to pass only raw objects through.  Easy fix (spread operator) - const rawObject = {...typedObject}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created: string;
}
