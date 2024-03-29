## C. Визуализация бинарного дерева (2 балла)

Разработчику Саше дали задачу реализовать функцию для визуализации бинарного дерева, но он плохо понял суть и допустил много ошибок. Помогите ему их найти и поправить.

### Формат ввода
```
const root = new BinaryTreeNode(3);  
const output = printTree(  
    root.insert(2).insert(5).insert(4).insert(6)  
);
```

### Формат вывода

```
>            3  
>      0000000000000  
>      2           5  
>               0000000  
>               4     6
```

### Примечания

Необходимо найти и исправить ошибки в коде [task.js](https://gist.github.com/alt-j/6d366dd7e446d54fc305969a6d647580), которая экспортирует функцию для визуализации бинарного дерева. На вход функции подается корневая нода бинарного дерева, реализованная следующим интерфейсом:
```
interface IBinaryTreeNode {  
    data: number;  
    left: IBinaryTreeNode | null;  
    right: IBinaryTreeNode | null;  
 
    constructor(data: number);  
 
    insert(data: number): this;  
    toString(): string;  
}  
 
type IPrintTree = (node: IBinaryTreeNode) => string;
```

Требования к возвращаемой строке:

- Каждая строка начинается с > .
- Под каждой цифрой должен быть следующий символ: * 0 - есть обе ветви. * 0 - есть только левая ветвь. * 0 - есть только правая ветвь.
- Правая и левая ветвь у родителя должна быть одинаковой длины. Удлинение необходимо производить символом 0, минимальное кол-во - 2.
- Даже если одной из ветвей нет, то под неё должно быть выделено расстояние аналогичное тому, если бы ветвь существовала. То есть заполнено пробелами.
- Окончание ветви должно быть одним из символов 0 и 0 для левой и правой ветвей соответственно.
- Значения должны быть центрированы относительно ветви. Если символов нечетное кол-во, то индекс округляем в большую сторону.
- На конце строк не должно быть лишних пробелов.

Решение необходимо предоставить в виде исправленого модуля **task.js.**
