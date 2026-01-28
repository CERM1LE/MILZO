import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage {
  // Основные данные
  age: number = 20;
  height: number = 180;
  
  items = [
    { name: 'Игрушка', energy: 1000 },
    { name: 'Манго', energy: 154 },
    { name: 'Огурец', energy: 45 },
    { name: 'Абрикос', energy: 234 }
  ];

  // Данные таблицы
  tableData: any[] = [];
  tableColumns: number = 0;
  
  // Модальные окна
  isModalOpen = false;
  isCreateTableModalOpen = false;
  isInfoModalOpen = false;
  isItemModalOpen = false;
  
  // Данные для создания таблицы
  newTableRows: number = 5;
  newTableCols: number = 5;
  
  // Данные для редактирования
  editingIndex = -1;
  newRow: string[] = [];
  
  // Временные данные для информации
  tempAge: number = 0;
  tempHeight: number = 0;
  
  // Временные данные для продуктов
  tempItem: any = { name: '', energy: 0 };
  editingItem: any = null;

  constructor() {}

  // ========== Методы для таблицы ==========
  openCreateTableModal() {
    this.isCreateTableModalOpen = true;
  }

  closeCreateTableModal() {
    this.isCreateTableModalOpen = false;
  }

  createTable() {
    if (this.newTableRows > 0 && this.newTableCols > 0) {
      this.tableColumns = this.newTableCols;
      this.tableData = [];
      
      // Создаем пустые строки
      for (let i = 0; i < this.newTableRows; i++) {
        const row = new Array(this.newTableCols).fill('');
        this.tableData.push(row);
      }
      
      this.closeCreateTableModal();
    }
  }

  getColumnArray(): number[] {
    return new Array(this.tableColumns);
  }

  openModal() {
    this.isModalOpen = true;
    this.editingIndex = -1;
    this.newRow = new Array(this.tableColumns).fill('');
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingIndex = -1;
  }

  addRow() {
    if (this.editingIndex >= 0) {
      // Редактирование существующей строки
      this.tableData[this.editingIndex] = [...this.newRow];
    } else {
      // Добавление новой строки
      this.tableData.push([...this.newRow]);
    }
    this.closeModal();
  }

  editRow(index: number) {
    this.editingIndex = index;
    this.newRow = [...this.tableData[index]];
    this.isModalOpen = true;
  }

  deleteRow(index: number) {
    this.tableData.splice(index, 1);
  }

  // ========== Методы для информации (возраст и рост) ==========
  openInfoModal() {
    this.tempAge = this.age;
    this.tempHeight = this.height;
    this.isInfoModalOpen = true;
  }

  closeInfoModal() {
    this.isInfoModalOpen = false;
  }

  saveInfo() {
    this.age = this.tempAge;
    this.height = this.tempHeight;
    this.closeInfoModal();
  }

  // ========== Методы для продуктов ==========
  addNewItem() {
    this.editingItem = null;
    this.tempItem = { name: '', energy: 0 };
    this.isItemModalOpen = true;
  }

  editItem(item: any) {
    this.editingItem = item;
    this.tempItem = { ...item }; // Копируем данные
    this.isItemModalOpen = true;
  }

  closeItemModal() {
    this.isItemModalOpen = false;
    this.editingItem = null;
  }

  saveItem() {
    if (this.editingItem) {
      // Редактирование существующего продукта
      const index = this.items.indexOf(this.editingItem);
      if (index !== -1) {
        this.items[index] = { ...this.tempItem };
      }
    } else {
      // Добавление нового продукта
      this.items.push({ ...this.tempItem });
    }
    this.closeItemModal();
  }

  deleteItem() {
    if (this.editingItem) {
      const index = this.items.indexOf(this.editingItem);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      this.closeItemModal();
    }
  }
}
