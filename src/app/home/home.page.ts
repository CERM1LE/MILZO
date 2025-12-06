import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  age: number = 20;
  height: number = 186;

  items = [
    { name: 'Еда', energy: 1280 },
    { name: 'Арахис', energy: 120 },
    { name: 'Банан', energy: 97 },
    { name: 'Гранат', energy: 47 }
  ];

  // Данные для таблицы книг (4 строки x 5 колонок)
  tableData: any[][] = [
    ['1984', 'Джордж Оруэлл', 'Антиутопия', '1949', 'Прочитано'],
    ['Мастер и Маргарита', 'Михаил Булгаков', 'Роман', '1967', 'Читаю'],
    ['Гарри Поттер', 'Дж.К. Роулинг', 'Фэнтези', '1997', 'Прочитано'],
    ['Преступление и наказание', 'Фёдор Достоевский', 'Классика', '1866', 'В планах']
  ];

  // Данные формы
  newRow = {
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: ''
  };

  // Флаг для отображения модального окна
  isModalOpen = false;
  // Индекс редактируемой строки (-1 если добавление новой)
  editingIndex = -1;

  constructor() {}

  // Открыть модальное окно для добавления
  openModal() {
    this.editingIndex = -1;
    this.newRow = {
      col1: '',
      col2: '',
      col3: '',
      col4: '',
      col5: ''
    };
    this.isModalOpen = true;
  }

  // Открыть модальное окно для редактирования
  editRow(index: number) {
    this.editingIndex = index;
    const row = this.tableData[index];
    this.newRow = {
      col1: row[0],
      col2: row[1],
      col3: row[2],
      col4: row[3],
      col5: row[4]
    };
    this.isModalOpen = true;
  }

  // Закрыть модальное окно
  closeModal() {
    this.isModalOpen = false;
    this.editingIndex = -1;
    // Очистка формы при закрытии
    this.newRow = {
      col1: '',
      col2: '',
      col3: '',
      col4: '',
      col5: ''
    };
  }

  // Метод для добавления или обновления строки
  addRow() {
    if (this.newRow.col1 || this.newRow.col2 || this.newRow.col3 || 
        this.newRow.col4 || this.newRow.col5) {
      const row = [
        this.newRow.col1,
        this.newRow.col2,
        this.newRow.col3,
        this.newRow.col4,
        this.newRow.col5
      ];
      
      if (this.editingIndex >= 0) {
        // Обновление существующей строки
        this.tableData[this.editingIndex] = row;
      } else {
        // Добавление новой строки
        this.tableData.push(row);
      }
      
      // Закрыть модальное окно и очистить форму
      this.closeModal();
    }
  }

  // Метод для удаления строки
  deleteRow(index: number) {
    this.tableData.splice(index, 1);
  }
}