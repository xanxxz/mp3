import { categories, type Category } from './categories';

interface CatalogColumn {
  items: {
    title: string;
    path: string;
  }[];
}

// Функция собирает категории верхнего уровня и их подкатегории
export const catalogData: CatalogColumn[] = categories
  .filter(cat => !cat.parentId) // берём только верхние категории
  .map(parent => {
    const subItems = categories
      .filter(cat => cat.parentId === parent.id)
      .map(sub => ({
        title: sub.name,
        path: sub.path,
      }));

    // Если есть подкатегории — показываем их, иначе просто родителя
    const items = subItems.length
      ? subItems
      : [{ title: parent.name, path: parent.path }];

    return { items };
  });
