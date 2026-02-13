export interface Category {
  id: string;
  name: string;
  parentId?: string;
  productCount: number;
  path: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Каталог', productCount: 0, path: '/catalog' },

  // Электроинструмент
  { id: '2', name: 'Электроинструмент', parentId: '1', productCount: 3457, path: '/catalog/electroinstrument' },
  { id: '20', name: 'Дрели и шуруповерты', parentId: '2', productCount: 890, path: '/catalog/electroinstrument/drills' },
  { id: '21', name: 'Перфораторы', parentId: '2', productCount: 450, path: '/catalog/electroinstrument/hammer-drills' },
  { id: '22', name: 'Шлифмашины', parentId: '2', productCount: 670, path: '/catalog/electroinstrument/grinders' },

  // Ручной инструмент
  { id: '3', name: 'Ручной инструмент', parentId: '1', productCount: 1280, path: '/catalog/hand-tools' },
  { id: '30', name: 'Молотки', parentId: '3', productCount: 320, path: '/catalog/hand-tools/hammers' },
  { id: '31', name: 'Отвёртки', parentId: '3', productCount: 410, path: '/catalog/hand-tools/screwdrivers' },
  { id: '32', name: 'Плоскогубцы', parentId: '3', productCount: 550, path: '/catalog/hand-tools/pliers' },

  // Садовая техника
  { id: '4', name: 'Садовая техника', parentId: '1', productCount: 532, path: '/catalog/garden-machinery' },
  { id: '40', name: 'Газонокосилки', parentId: '4', productCount: 220, path: '/catalog/garden-machinery/lawn-mowers' },
  { id: '41', name: 'Триммеры', parentId: '4', productCount: 180, path: '/catalog/garden-machinery/trimmers' },
  { id: '42', name: 'Садовые измельчители', parentId: '4', productCount: 132, path: '/catalog/garden-machinery/chippers' },

  // Столярные изделия
  { id: '5', name: 'Столярные изделия', parentId: '1', productCount: 3457, path: '/catalog/carpentry' },
  { id: '50', name: 'Столы', parentId: '5', productCount: 1200, path: '/catalog/carpentry/tables' },
  { id: '51', name: 'Стулья', parentId: '5', productCount: 950, path: '/catalog/carpentry/chairs' },

  // Сантехника
  { id: '6', name: 'Сантехника', parentId: '1', productCount: 1280, path: '/catalog/plumbing' },
  { id: '60', name: 'Краны', parentId: '6', productCount: 500, path: '/catalog/plumbing/faucets' },
  { id: '61', name: 'Трубы и фитинги', parentId: '6', productCount: 780, path: '/catalog/plumbing/pipes-fittings' },

  // Общестроительные материалы
  { id: '7', name: 'Общестроительные материалы', parentId: '1', productCount: 532, path: '/catalog/construction' },
  { id: '70', name: 'Цемент и смеси', parentId: '7', productCount: 250, path: '/catalog/construction/cement' },
  { id: '71', name: 'Кирпичи', parentId: '7', productCount: 282, path: '/catalog/construction/bricks' },

  // Все для сауны и бани
  { id: '8', name: 'Все для сауны и бани', parentId: '1', productCount: 3457, path: '/catalog/sauna' },
  { id: '80', name: 'Бочки и купели', parentId: '8', productCount: 1200, path: '/catalog/sauna/barrels' },
  { id: '81', name: 'Аксессуары', parentId: '8', productCount: 2257, path: '/catalog/sauna/accessories' },
];
