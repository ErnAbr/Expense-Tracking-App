export interface CategoryObject {
  id: number;
  name: string;
  iconName: string;
  userId: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  iconName: string;
  categoryId: number;
  expenses: Expense[];
}

export interface Expense {
  id: number;
  amount: number;
  amountDate: string;
  userId: number;
}

export interface CategoryAddData {
  category: string;
  iconName: string;
  subcategory: {
    subcategoryName: string;
    subcategoryIconName: string;
  }[];
}

export interface CategoryPutData {
  id: number;
  type: string;
  data: {
    name: string;
    iconName: string;
  };
}

export interface CategoryDeleteData {
  id: number;
  type: string;
}

export interface EditTarget {
  id: number;
  type: "cat" | "sub";
}
