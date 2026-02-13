export interface RawCategory {
  id: string;
  name: string;
  parent_id: string | null;
  product_count: number;
  path: string;
}

export interface CategoryNode extends RawCategory {
  children: CategoryNode[];
}


export const buildCategoryTree = (flat: RawCategory[]): CategoryNode[] => {
  const map = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];

  // создаём узлы
  flat.forEach(cat => {
    map.set(cat.id, { ...cat, children: [] });
  });

  // связываем родителей и детей
  map.forEach(cat => {
    if (cat.parent_id) {
      const parent = map.get(cat.parent_id);
      parent?.children.push(cat);
    } else {
      roots.push(cat);
    }
  });

  return roots;
};
