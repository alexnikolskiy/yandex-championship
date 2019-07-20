## A. Гео регионы (1 балл)

В базе данных хранится информация о географических объектах в виде дерева: Страны: Регионы: Города.<br>
Для обеспечения быстрого поиска по id необходимо написать функцию, которая принимает на вход дерево и превращает его в хеш.

### Формат ввода
```
[  
    {  
        id: 9527, name: ’Россия’,  
        children: [  
            {  
                id: 95134,  
                name: ’Приморский край’,  
                children: [  
                    {id: 9529, name: ’Владивосток’},  
                    {id: 90163, name: ’Артем’}  
                ]  
            },  
            {id: 78274, name: ’Москва’}  
        ]  
    }  
]
```

### Формат вывода
```
{  
  ’9527’: { name: ’Россия’, children: [ 95134, 78274 ] },  
  ’9529’: { name: ’Владивосток’, parent: 95134 },  
  ’78274’: { name: ’Москва’, parent: 9527 },  
  ’90163’: { name: ’Артем’, parent: 95134 },  
  ’95134’: { name: ’Приморский край’, parent: 9527, children: [ 9529, 90163 ] }  
}
```

### Примечания
Информация о каждом геообъекте представлена следующим интерфейсом:
```
type GeoId = number;  
 
interface GeoObject {  
    id: number;  
    name: string;  
    children?: GeoObject[]  
}  
 
// Интерфейс входа:  
type Regions = GeoObject[];  
 
interface GeoRecord {  
  name: string;  
  parent?: GeoId;  
  children?: GeoId[];  
}  
 
// Интерфейс выхода:  
interface Geobase {  
  [key: GeoId]: GeoRecord;  
}
```

Решение необходимо предоставить в виде CommonJS-модуль:

```
module.exports = function (regions) {  
    // Your code here.  
};
```
