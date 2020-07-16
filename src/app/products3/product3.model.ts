export interface Product3 {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number
  sortOrder: number;
  created: string;
}

export function compareProducts3(p1: Product3, p2: Product3) {
  const compare = p1.sortOrder - p2.sortOrder;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;
}

