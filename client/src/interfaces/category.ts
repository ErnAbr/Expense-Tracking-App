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
  date: string;
  userId: number;
}

export interface CategoryDeleteData {
  id: number;
  type: string;
}
