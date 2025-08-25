export interface MergedObjects {
  categoryId: number;
  categoryName: string;
  categoryIconName: string;
  totalSpentByCategory: number;
  subcategory: {
    subcategoryId: number;
    subcategoryName: string;
    subcategoryIconName: string;
    totalSpentBySubcategory: number;
    plannedExpenses: number;
  }[];
}
