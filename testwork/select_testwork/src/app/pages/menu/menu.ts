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
