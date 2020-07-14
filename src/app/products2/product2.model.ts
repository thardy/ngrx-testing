export interface Product2 {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number
  sortOrder: number;
  created: string;
}

export function compareProducts2(p1: Product2, p2: Product2) {
  const compare = p1.sortOrder - p2.sortOrder;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;
}

