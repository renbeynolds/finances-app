export type Category = {
  id: number;
  name: string;
  type: string;
  iconUrl: string | null;
  parentCategoryId: number | null;
};
