#### Стек технологий:
- HTML, CSS
- TypeScript
- Angular 19+
#### Задачи:
1. Мини-приложение из двух страниц, на первой странице должен
быть текст приветствия и ссылка на вторую страницу.
2. На второй странице — меню со списком элементов в виде checkbox и
значением.
3. В заголовке должно показываться выбранное меню в данный момент,
количество выбранных элементов на странице и их общее значение.
Только с одной страницы.

# Начало

Я начал с разбора стека, ```HTML```, ```CSS``` и ```TS``` мне были занкомы давно, а вот, что такое ```Angular``` я услышал впревые. Я зашел в ChatGPT и узнал, что это за фреймворк, узнал для чего он нужен, какие преимущества он мне даст. 

# Создание директории

Мною был скачен ```Angular```

```
npm install -g @angular/cli
```

Далее я создал саму директорию как раз через него

```
ng new select_testwork
```

Потом я создал компоненты
```
ng generate component pages/home
ng generate component pages/menu
```
Angular может генинорвать компоненты, а в свою очередь ```Component``` в Angular - это блок интерфейса приложения, который содержить HTML, CSS и файл TS для логики.

В конечном итоге у меня получилась директория под тестовое задание

<img src="https://tt3cpl.github.io/select_testwork/assets/1.png" alt="директория" width="200">

# Разработка

1. В начале я настроил ```app.routes.ts```, для настройки роутинга страниц

Листинг app.routes.ts: 
```Ts
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "menu", component: Menu }
];
```

Собственно видно, что настроин роутинг на начальную страницу и на страницу с меню

2. Настройка страницы ```Home```


Листинг home.html:
```html
<h1>Добро пожаловать!</h1>

<p>Это тестовое приложение.</p>

<a routerLink="/menu">Перейти к меню</a>
```

Листинг home.ts:
```ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
```

Здесь была настроина страница HTML для первой страницы, согласно первой задаче из ТЗ.
В файле ```home.ts``` я добавил ```RouterLink```, чтобы при нажатии кнопки "Перейти в меню", нас перенаправляло на страницу с меню

3. Настройка страницы ```Menu```

В этом пункте я расскажу про проделаю работу в ходе выполнения пунктом 2 и 3 из ТЗ

И так, первым делом я настроил логику

Листинг menu.ts:
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  id: number;
  name: string;
  dishes: Dish[];
}

interface Dish {
  id: number;
  name: string;
  price: number;
  checked: boolean;
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu {
  menu: MenuItem[] = [
    {
      id: 1,
      name: 'Завтрак',
      dishes: [
        { id: 1, name: 'Овсяная каша', price: 100, checked: false },
        { id: 2, name: 'Яичница', price: 150, checked: false },
        { id: 3, name: 'Блинчики', price: 120, checked: false },
      ],
    },
    {
      id: 2,
      name: 'Обед',
      dishes: [
        { id: 4, name: 'Суп', price: 200, checked: false },
        { id: 5, name: 'Гречка с мясом', price: 250, checked: false },
        { id: 6, name: 'Салат', price: 150, checked: false },
      ],
    },
    {
      id: 3,
      name: 'Ужин',
      dishes: [
        { id: 7, name: 'Паста', price: 220, checked: false },
        { id: 8, name: 'Рыба с овощами', price: 300, checked: false },
        { id: 9, name: 'Овощное рагу', price: 180, checked: false },
      ],
    },
  ];

  get selectedMenu(): MenuItem | undefined {
    return this.menu.find((item) => item.dishes.some((dish) => dish.checked));
  }

  get selectedItems(): Dish[] {
    const selectedMenu = this.selectedMenu;
    return selectedMenu ? selectedMenu.dishes.filter((dish) => dish.checked) : [];
  }

  get totalPrice(): number {
    return this.selectedItems.reduce((total, dish) => total + dish.price, 0);
  }
}
```
В ходе разбора SDK Angular`а я нашел два модуля, которые помогут мне с выводом статических данных, CommonModule и FormsModule. Сначала я подключил эти модули (про них я расскажу позже), далее я создал два интерфейса, ```MenuItem``` и ```Dish```, первый под меню, а второй под блюда в меню.

В листинге кода видно, что интерфейс меню(```MenuItem```) содержит номер(```id```), название(```name```) и блюда в виде списка(```dishes```). Интерфейс ```Dish``` содержит номер(```id```), название(```name```), стомость(```price```) и булево свойство ```checked```, для проверки выбрали ли мы это блюдо. 

Далее я заполнил статические данные и настроил геттеры. Про статические данные нам не интересно, кроме того, что я написал их согласно ранее описаным интерфейсам, а так же, что я придумал их из головы.

Перейдем к описанию геттеров:

```ts
get selectedMenu(): MenuItem | undefined {
    return this.menu.find((item) => item.dishes.some((dish) => dish.checked));
  }
```
- Геттер выбора меню. Начнем сначала, геттер может вернуть либо объект меню либо ничего, если ничего не выбрано. Объект меню он выбирает следующим образом: он ищет первый элемент массива меню, который удовлетворяет условию, что хотя один элемент в бюдах, которые содержатся в этом меню, будет иметь ```checked: true```. 

```ts
get selectedItems(): Dish[] {
    const selectedMenu = this.selectedMenu;
    return selectedMenu ? selectedMenu.dishes.filter((dish) => dish.checked) : [];
  }
```
- Геттер выбранных блюд. Геттер ```selectedItems``` возвращает массив выбранных блюд (```Dish[]```) из первого выбранного меню (```selectedMenu```), а если меню нет, возвращает пустой массив. Через метод ```filter``` я как раз и ищу все блюда, которые имеют ```checked: true```

```ts
get totalPrice(): number {
    return this.selectedItems.reduce((total, dish) => total + dish.price, 0);
  }
```
- Геттер общей суммы выбранных блюд. Геттер ```totalPrice``` возращает сумму выбранных блюд (```selectedItems```). С помощью метода ```reduce``` я считаю общую сумму, добавляя к начальному значению (```0```) цену блюда

###### Перейдем в html в меню

Листринг menu.html:
```html
<h2>
  Выбраны меню: 
  <ng-container *ngIf="selectedMenu; else noMenu">
    {{ selectedMenu.name }}
  </ng-container>
  <ng-template #noMenu>-</ng-template>
  |
  Количество: {{ selectedItems.length }} |
  Сумма: {{ totalPrice }}
</h2>

<div *ngFor="let m of menu">
  <h3>{{ m.name }}</h3>
  <ul>
    <li *ngFor="let dish of m.dishes">
      <label>
        <input type="checkbox" [(ngModel)]="dish.checked">
        {{ dish.name }} - {{ dish.price }}
      </label>
    </li>
  </ul>
</div>
```
Здесь мне как раз пригодились модули CommonModule и FormsModule. С их помощью я теперь имею возможность использовать ```*ngIf```, для условного отображения блока, ```*ngFor```, для перебор массива, и ```(ngModel)``` для двусторонней привязки. 

И так в начале с помощью ```*ngIf``` я проверю выбрано ли меню, если ```selectedMenu``` есть, то выводим его, если нет то Angular берет шаблон ```<ng-template #noMenu>-</ng-template>``` и ставит прочерк.

Далее количество у нас выводится как длинна массива, который выдает геттер ```selectedItems```. 

Потом вывожу сумму цены блюд. 

Затем создаем контейнер для каждого меню. С помощью ```*ngFor``` мы проходимся по всем объектам меню ```let m of menu``` и выводим в каждом контетйнере название. 

Далее под каждое меню мы создаем спикок ```<ul>``` и опять с помощью ```*ngFor``` мы проходимся по всем объектам блюд из меню ```let dish of m.dishes``` 

Потом я через ```<label>``` обернул чекбокс и текст, чтобы при клике на текст у меня тоже ставилась галочка.

Далее я создал чекбокс и с помощью ```(ngModel)``` я сделал двустороннюю привязку, чтобы при нажатии на чекбокс/текст у объекста менялся checked с false на true.

Ну, и в конце вывод название блюда и его стоимость через дефис 

# Итог
<video controls>
  <source src="https://tt3cpl.github.io/select_testwork/assets/video.mp4" type="video/mp4">
</video>

Выше вы можете увидеть видео с работоспособностью моей работы.

# Вывод

Я благодарен, что поучаствовал в отборочном этапе и выполнил тестовое задание. В ходе его выполнения, я узнал о новом для себя фреймворке и повзаимодействовал с ним, выполнил все задания из ТЗ, и в конечном итоге получил двустраничный сайт, который удовлетворяет всем задачам. Спасибо еще раз команде Select за предоставленую возможность. Жду, с нетерпением, обратной связи.