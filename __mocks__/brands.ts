export interface Brand {
  id: string;
  name: string;
  productCount: number;
  categoryIds: string[]; // в каких категориях есть товары бренда
}

export const brands: Brand[] = [
  {
    id: 'bosch',
    name: 'Bosch',
    productCount: 10,
    categoryIds: ['20', '21', '22', '30', '50', '60', '70'], // дрели/шурупы, перфораторы, шлифмашины, молотки, столы, краны, цемент
  },
  {
    id: 'makita',
    name: 'Makita',
    productCount: 8,
    categoryIds: ['20', '21', '22', '40', '41', '42'], // дрели/шурупы, перфораторы, шлифмашины, газонокосилки, триммеры, измельчители
  },
  {
    id: 'dewalt',
    name: 'DeWalt',
    productCount: 7,
    categoryIds: ['20', '21', '22', '40', '41', '42'], // дрели/шурупы, перфораторы, шлифмашины, газонокосилки, триммеры, измельчители
  },
  {
    id: 'metabo',
    name: 'Metabo',
    productCount: 6,
    categoryIds: ['30', '31', '32', '50', '51', '60', '70'], // молотки, отвёртки, плоскогубцы, столы, стулья, краны, смеси
  },
  {
    id: 'woodstyle',
    name: 'WoodStyle',
    productCount: 2,
    categoryIds: ['50', '51'], // столы, стулья
  },
  {
    id: 'plumbex',
    name: 'Plumbex',
    productCount: 2,
    categoryIds: ['61'], // трубы и фитинги
  },
  {
    id: 'brickex',
    name: 'Brickex',
    productCount: 2,
    categoryIds: ['71'], // кирпичи
  },
  {
    id: 'saunex',
    name: 'Saunex',
    productCount: 4,
    categoryIds: ['80', '81'], // бочки и купели, аксессуары
  },
  {
    id: 'stanley',
    name: 'Stanley',
    productCount: 3,
    categoryIds: ['30', '31', '32'], // ручной инструмент: молотки, отвёртки, плоскогубцы
  },
];
