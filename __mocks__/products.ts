import gnida from '/images/products/gnida.png';
import gnida1 from '/images/products/gnida1.png';

export interface ProductCharacteristic {
  name: string;
  value: string;
}

export interface ProductData {
  id: string;
  art?: string;
  name: string;
  price: number;
  brandId: string;
  subcategoryId: string;
  images: string[];
  characteristics: ProductCharacteristic[];
  inStock: boolean;
  description: string;
}

const productData: ProductData[] = [
  // Электроинструмент -> Дрели и шуруповерты
  {
    id: 'p1',
    name: 'Дрель Bosch GSR 12V-15',
    price: 12000,
    brandId: 'bosch',
    subcategoryId: '20',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '12V' },
      { name: 'Вес', value: '1.2 кг' },
      { name: 'Макс. диаметр сверления', value: '20 мм' },
    ],
    inStock: true,
    description: 'Легкая и мощная дрель Bosch для дома и небольших ремонтов.',
  },
  {
    id: 'p2',
    name: 'Шуруповерт Makita DF347DWE',
    price: 9500,
    brandId: 'makita',
    subcategoryId: '20',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Мощность', value: '14.4V' },
      { name: 'Вес', value: '1.3 кг' },
      { name: 'Емкость АКБ', value: '1.5 Ач' },
    ],
    inStock: true,
    description: 'Компактный аккумуляторный шуруповерт Makita с двухскоростным редуктором.',
  },
  {
    id: 'p3',
    name: 'Дрель DeWalt DCD771C2',
    price: 11000,
    brandId: 'dewalt',
    subcategoryId: '20',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '18V' },
      { name: 'Вес', value: '1.5 кг' },
      { name: 'Макс. диаметр сверления', value: '25 мм' },
    ],
    inStock: false,
    description: 'Профессиональная дрель DeWalt для бытовых и строительных задач.',
  },

  // Электроинструмент -> Перфораторы
  {
    id: 'p4',
    name: 'Перфоратор Bosch GBH 2-26',
    price: 18000,
    brandId: 'bosch',
    subcategoryId: '21',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '800W' },
      { name: 'Вес', value: '2.7 кг' },
      { name: 'Сила удара', value: '2.7 Дж' },
    ],
    inStock: true,
    description: 'Ударный перфоратор Bosch для точных и мощных работ.',
  },
  {
    id: 'p5',
    name: 'Перфоратор Makita HR2470',
    price: 16000,
    brandId: 'makita',
    subcategoryId: '21',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Мощность', value: '780W' },
      { name: 'Вес', value: '2.9 кг' },
      { name: 'Сила удара', value: '2.4 Дж' },
    ],
    inStock: true,
    description: 'Надежный перфоратор Makita с быстрым переключением режимов.',
  },
  {
    id: 'p6',
    name: 'Перфоратор DeWalt D25133K',
    price: 20000,
    brandId: 'dewalt',
    subcategoryId: '21',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '800W' },
      { name: 'Вес', value: '3.1 кг' },
      { name: 'Сила удара', value: '2.8 Дж' },
    ],
    inStock: false,
    description: 'DeWalt D25133K — профессиональный перфоратор для интенсивной работы.',
  },

  // Электроинструмент -> Шлифмашины
  {
    id: 'p7',
    name: 'Шлифмашина Bosch GEX 125-1 AE',
    price: 9500,
    brandId: 'bosch',
    subcategoryId: '22',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '250W' },
      { name: 'Вес', value: '1.2 кг' },
      { name: 'Обороты', value: '12000 об/мин' },
    ],
    inStock: true,
    description: 'Компактная эксцентриковая шлифмашина Bosch для работы с деревом и краской.',
  },
  {
    id: 'p8',
    name: 'Шлифмашина Makita BO5041',
    price: 9000,
    brandId: 'makita',
    subcategoryId: '22',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Мощность', value: '300W' },
      { name: 'Вес', value: '1.4 кг' },
      { name: 'Обороты', value: '14000 об/мин' },
    ],
    inStock: true,
    description: 'Удобная и надежная шлифмашина Makita с регулировкой оборотов.',
  },
  {
    id: 'p9',
    name: 'Шлифмашина DeWalt DWE6423',
    price: 10500,
    brandId: 'dewalt',
    subcategoryId: '22',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '280W' },
      { name: 'Вес', value: '1.5 кг' },
      { name: 'Обороты', value: '12000-28000 об/мин' },
    ],
    inStock: true,
    description: 'Эксцентриковая шлифмашина DeWalt для профессиональной обработки поверхностей.',
  },

  // Ручной инструмент -> Молотки
  {
    id: 'p10',
    name: 'Молоток Stanley 16oz',
    price: 1200,
    brandId: 'stanley',
    subcategoryId: '30',
    images: [gnida],
    characteristics: [
      { name: 'Вес', value: '0.45 кг' },
      { name: 'Материал', value: 'Сталь + Дерево' },
    ],
    inStock: true,
    description: 'Классический молоток Stanley для дома и ремонта.',
  },
  {
    id: 'p11',
    name: 'Молоток Metabo 20oz',
    price: 1400,
    brandId: 'metabo',
    subcategoryId: '30',
    images: [gnida1],
    characteristics: [
      { name: 'Вес', value: '0.57 кг' },
      { name: 'Материал', value: 'Сталь + Пластик' },
    ],
    inStock: false,
    description: 'Прочный молоток Metabo для строительных работ.',
  },
  {
    id: 'p12',
    name: 'Молоток Bosch 18oz',
    price: 1300,
    brandId: 'bosch',
    subcategoryId: '30',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Вес', value: '0.51 кг' },
      { name: 'Материал', value: 'Сталь + Пластик' },
    ],
    inStock: true,
    description: 'Легкий и удобный молоток Bosch для повседневного использования.',
  },

  // Ручной инструмент -> Отвёртки
  {
    id: 'p13',
    name: 'Отвёртка PH2 Stanley',
    price: 400,
    brandId: 'stanley',
    subcategoryId: '31',
    images: [gnida],
    characteristics: [
      { name: 'Длина', value: '150 мм' },
      { name: 'Материал', value: 'Хром-ванадий' },
    ],
    inStock: true,
    description: 'Удобная отвёртка Stanley для точной работы с крепежом.',
  },
  {
    id: 'p14',
    name: 'Отвёртка SL6 Metabo',
    price: 450,
    brandId: 'metabo',
    subcategoryId: '31',
    images: [gnida1],
    characteristics: [
      { name: 'Длина', value: '150 мм' },
      { name: 'Материал', value: 'Сталь' },
    ],
    inStock: true,
    description: 'Прочная и надежная отвёртка Metabo для дома и стройки.',
  },
  {
    id: 'p15',
    name: 'Отвёртка PH1 Bosch',
    price: 420,
    brandId: 'bosch',
    subcategoryId: '31',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Длина', value: '100 мм' },
      { name: 'Материал', value: 'Сталь' },
    ],
    inStock: false,
    description: 'Качественная отвёртка Bosch с эргономичной ручкой.',
  },

  // Ручной инструмент -> Плоскогубцы
  {
    id: 'p16',
    name: 'Плоскогубцы Stanley 200 мм',
    price: 800,
    brandId: 'stanley',
    subcategoryId: '32',
    images: [gnida],
    characteristics: [
      { name: 'Длина', value: '200 мм' },
      { name: 'Материал', value: 'Сталь' },
    ],
    inStock: true,
    description: 'Плоскогубцы Stanley для захвата и изгиба проволоки.',
  },
  {
    id: 'p17',
    name: 'Плоскогубцы Metabo 180 мм',
    price: 750,
    brandId: 'metabo',
    subcategoryId: '32',
    images: [gnida1],
    characteristics: [
      { name: 'Длина', value: '180 мм' },
      { name: 'Материал', value: 'Сталь' },
    ],
    inStock: false,
    description: 'Компактные плоскогубцы Metabo для точной работы.',
  },
  {
    id: 'p18',
    name: 'Плоскогубцы Bosch 200 мм',
    price: 900,
    brandId: 'bosch',
    subcategoryId: '32',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Длина', value: '200 мм' },
      { name: 'Материал', value: 'Сталь + Пластик' },
    ],
    inStock: true,
    description: 'Удобные плоскогубцы Bosch с анатомической ручкой.',
  },

  // Садовая техника -> Газонокосилки
  {
    id: 'p19',
    name: 'Газонокосилка Bosch Rotak 32',
    price: 15000,
    brandId: 'bosch',
    subcategoryId: '40',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '1200W' },
      { name: 'Ширина скашивания', value: '32 см' },
      { name: 'Вес', value: '12 кг' },
    ],
    inStock: true,
    description: 'Компактная газонокосилка Bosch для небольших участков.',
  },
  {
    id: 'p20',
    name: 'Газонокосилка Makita ELM4121',
    price: 14000,
    brandId: 'makita',
    subcategoryId: '40',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Мощность', value: '1300W' },
      { name: 'Ширина скашивания', value: '40 см' },
      { name: 'Вес', value: '14 кг' },
    ],
    inStock: true,
    description: 'Надежная электрическая газонокосилка Makita для ровного газона.',
  },
  {
    id: 'p21',
    name: 'Газонокосилка DeWalt DLM431',
    price: 16000,
    brandId: 'dewalt',
    subcategoryId: '40',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '1500W' },
      { name: 'Ширина скашивания', value: '43 см' },
      { name: 'Вес', value: '15 кг' },
    ],
    inStock: false,
    description: 'Профессиональная газонокосилка DeWalt для средних участков.',
  },

  // Садовая техника -> Триммеры
  {
    id: 'p22',
    name: 'Триммер Bosch ART 26',
    price: 6000,
    brandId: 'bosch',
    subcategoryId: '41',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '250W' },
      { name: 'Длина ножа', value: '26 см' },
      { name: 'Вес', value: '2.5 кг' },
    ],
    inStock: true,
    description: 'Электрический триммер Bosch для аккуратной стрижки газона.',
  },
  {
    id: 'p23',
    name: 'Триммер Makita UR3500',
    price: 7500,
    brandId: 'makita',
    subcategoryId: '41',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Мощность', value: '350W' },
      { name: 'Длина ножа', value: '35 см' },
      { name: 'Вес', value: '3 кг' },
    ],
    inStock: true,
    description: 'Триммер Makita для работы с высокой травой и кустарниками.',
  },
  {
    id: 'p24',
    name: 'Триммер DeWalt DCM561',
    price: 8000,
    brandId: 'dewalt',
    subcategoryId: '41',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '500W' },
      { name: 'Длина ножа', value: '40 см' },
      { name: 'Вес', value: '3.5 кг' },
    ],
    inStock: false,
    description: 'Профессиональный триммер DeWalt для средних и больших участков.',
  },

  // Садовая техника -> Садовые измельчители
  {
    id: 'p25',
    name: 'Измельчитель Bosch AXT 25',
    price: 12000,
    brandId: 'bosch',
    subcategoryId: '42',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '2500W' },
      { name: 'Диаметр веток', value: '45 мм' },
      { name: 'Вес', value: '18 кг' },
    ],
    inStock: true,
    description: 'Эффективный садовый измельчитель Bosch для веток и кустарника.',
  },
  {
    id: 'p26',
    name: 'Измельчитель Makita UD2500',
    price: 11500,
    brandId: 'makita',
    subcategoryId: '42',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Мощность', value: '2500W' },
      { name: 'Диаметр веток', value: '40 мм' },
      { name: 'Вес', value: '20 кг' },
    ],
    inStock: true,
    description: 'Надежный измельчитель Makita для обработки садового мусора.',
  },
  {
    id: 'p27',
    name: 'Измельчитель DeWalt DXR2000',
    price: 14000,
    brandId: 'dewalt',
    subcategoryId: '42',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Мощность', value: '2800W' },
      { name: 'Диаметр веток', value: '50 мм' },
      { name: 'Вес', value: '22 кг' },
    ],
    inStock: false,
    description: 'Профессиональный садовый измельчитель DeWalt для крупных веток.',
  },

    // Столярные изделия -> Столы
  {
    id: 'p28',
    name: 'Стол обеденный WoodStyle',
    price: 12000,
    brandId: 'woodstyle',
    subcategoryId: '50',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Материал', value: 'Дерево' },
      { name: 'Длина', value: '160 см' },
      { name: 'Ширина', value: '80 см' },
    ],
    inStock: true,
    description: 'Прочный обеденный стол из натурального дерева, стильный и надежный.',
  },
  {
    id: 'p29',
    name: 'Стол письменный Metabo',
    price: 8000,
    brandId: 'metabo',
    subcategoryId: '50',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Материал', value: 'ЛДСП' },
      { name: 'Длина', value: '120 см' },
      { name: 'Ширина', value: '60 см' },
    ],
    inStock: true,
    description: 'Компактный письменный стол для дома и офиса.',
  },
  {
    id: 'p30',
    name: 'Стол журнальный Bosch',
    price: 5500,
    brandId: 'bosch',
    subcategoryId: '50',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Материал', value: 'Стекло + металл' },
      { name: 'Длина', value: '100 см' },
      { name: 'Ширина', value: '50 см' },
    ],
    inStock: false,
    description: 'Современный журнальный стол с металлическим каркасом и стеклянной столешницей.',
  },

  // Столярные изделия -> Стулья
  {
    id: 'p31',
    name: 'Стул деревянный WoodStyle',
    price: 2500,
    brandId: 'woodstyle',
    subcategoryId: '51',
    images: [gnida],
    characteristics: [
      { name: 'Материал', value: 'Дерево' },
      { name: 'Высота', value: '90 см' },
      { name: 'Ширина', value: '45 см' },
    ],
    inStock: true,
    description: 'Эргономичный деревянный стул для дома и офиса.',
  },
  {
    id: 'p32',
    name: 'Стул офисный Metabo',
    price: 4500,
    brandId: 'metabo',
    subcategoryId: '51',
    images: [gnida1],
    characteristics: [
      { name: 'Материал', value: 'Металл + ткань' },
      { name: 'Высота', value: '95 см' },
      { name: 'Регулировка', value: 'Есть' },
    ],
    inStock: true,
    description: 'Комфортный офисный стул с регулировкой высоты и мягким сиденьем.',
  },

  // Сантехника -> Краны
  {
    id: 'p33',
    name: 'Смеситель для кухни Bosch',
    price: 5500,
    brandId: 'bosch',
    subcategoryId: '60',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Материал', value: 'Нержавеющая сталь' },
      { name: 'Тип', value: 'Однорычажный' },
      { name: 'Высота', value: '25 см' },
    ],
    inStock: true,
    description: 'Качественный смеситель Bosch с долговечной конструкцией.',
  },

  {
    id: 'p34',
    name: 'Смеситель для ванной Metabo',
    price: 4500,
    brandId: 'metabo',
    subcategoryId: '60',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Материал', value: 'Латунь' },
      { name: 'Тип', value: 'Двухвентильный' },
      { name: 'Высота', value: '20 см' },
    ],
    inStock: true,
    description: 'Элегантный смеситель Metabo для ванной комнаты.',
  },

  // Сантехника -> Трубы и фитинги
  {
    id: 'p35',
    name: 'Труба ПВХ 50мм',
    price: 300,
    brandId: 'plumbex',
    subcategoryId: '61',
    images: [gnida],
    characteristics: [
      { name: 'Длина', value: '3 м' },
      { name: 'Материал', value: 'ПВХ' },
    ],
    inStock: true,
    description: 'Надежная труба ПВХ для систем водоснабжения.',
  },
  {
    id: 'p36',
    name: 'Фитинг ПВХ угол 90°',
    price: 150,
    brandId: 'plumbex',
    subcategoryId: '61',
    images: [gnida1],
    characteristics: [
      { name: 'Диаметр', value: '50 мм' },
      { name: 'Материал', value: 'ПВХ' },
    ],
    inStock: true,
    description: 'Фитинг для соединения труб ПВХ под углом 90°.',
  },

  // Общестроительные материалы -> Цемент и смеси
  {
    id: 'p37',
    name: 'Цемент М400 Bosch',
    price: 350,
    brandId: 'bosch',
    subcategoryId: '70',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Вес', value: '50 кг' },
      { name: 'Марка', value: 'М400' },
    ],
    inStock: true,
    description: 'Качественный цемент Bosch для строительства и ремонта.',
  },
  {
    id: 'p38',
    name: 'Смесь штукатурная Metabo',
    price: 500,
    brandId: 'metabo',
    subcategoryId: '70',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Вес', value: '25 кг' },
      { name: 'Применение', value: 'Штукатурка стен' },
    ],
    inStock: true,
    description: 'Удобная смесь для выравнивания стен и потолков.',
  },

  // Общестроительные материалы -> Кирпичи
  {
    id: 'p39',
    name: 'Кирпич керамический красный',
    price: 15,
    brandId: 'brickex',
    subcategoryId: '71',
    images: [gnida],
    characteristics: [
      { name: 'Размер', value: '250x120x65 мм' },
      { name: 'Материал', value: 'Керамика' },
    ],
    inStock: true,
    description: 'Качественный керамический кирпич для строительства стен.',
  },
  {
    id: 'p40',
    name: 'Кирпич силикатный белый',
    price: 18,
    brandId: 'brickex',
    subcategoryId: '71',
    images: [gnida1],
    characteristics: [
      { name: 'Размер', value: '250x120x65 мм' },
      { name: 'Материал', value: 'Силикат' },
    ],
    inStock: true,
    description: 'Прочный силикатный кирпич для внешних и внутренних стен.',
  },

  // Все для сауны и бани -> Бочки и купели
  {
    id: 'p41',
    name: 'Бочка деревянная 200 л',
    price: 8000,
    brandId: 'saunex',
    subcategoryId: '80',
    images: [gnida, gnida1],
    characteristics: [
      { name: 'Объем', value: '200 л' },
      { name: 'Материал', value: 'Дерево' },
    ],
    inStock: true,
    description: 'Классическая деревянная бочка для бани или сауны.',
  },
  {
    id: 'p42',
    name: 'Купель пластиковая 150 л',
    price: 5000,
    brandId: 'saunex',
    subcategoryId: '80',
    images: [gnida1, gnida],
    characteristics: [
      { name: 'Объем', value: '150 л' },
      { name: 'Материал', value: 'Пластик' },
    ],
    inStock: true,
    description: 'Легкая и удобная пластиковая купель для сауны.',
  },

  // Все для сауны и бани -> Аксессуары
  {
    id: 'p43',
    name: 'Ведро для сауны 10 л',
    price: 1500,
    brandId: 'saunex',
    subcategoryId: '81',
    images: [gnida],
    characteristics: [
      { name: 'Материал', value: 'Дерево' },
      { name: 'Объем', value: '10 л' },
    ],
    inStock: true,
    description: 'Деревянное ведро для сауны с черпаком.',
  },
  {
    id: 'p44',
    name: 'Шапка для бани',
    price: 800,
    brandId: 'saunex',
    subcategoryId: '81',
    images: [gnida1],
    characteristics: [
      { name: 'Материал', value: 'Войлок' },
      { name: 'Размер', value: 'Универсальный' },
    ],
    inStock: true,
    description: 'Защищает голову от перегрева в сауне или бане.',
  },
];

export default productData;
