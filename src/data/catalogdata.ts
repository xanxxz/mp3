import categoriesData from './categories.json'; // JSON-файл
import type { Category } from '../types/types'; // интерфейс Category

interface CatalogColumn {
  items: {
    title: string;
    path: string;
  }[];
}

// Приводим JSON к типу Category[]
const categories: Category[] = categoriesData;

// Логика та же, что была для TS-моков
export const catalogData: CatalogColumn[] = categories
  .filter(cat => !cat.parentId) // верхние категории
  .map(parent => {
    const subItems = categories
      .filter(cat => cat.parentId === parent.id)
      .map(sub => ({
        title: sub.name,
        path: sub.path,
      }));

    return {
      items: subItems.length ? subItems : [{ title: parent.name, path: parent.path }],
    };
  });
