import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @ContentChildren(ColumnComponent) columnsConfig: QueryList<ColumnComponent> =
    new QueryList<ColumnComponent>();

  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() data?: any;

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  getField(row: any, field: string) {
    const fieldArray = field.split('.');
    const result = fieldArray.reduce((acc, part) => acc && acc[part], row);
    return result;
  }
}
