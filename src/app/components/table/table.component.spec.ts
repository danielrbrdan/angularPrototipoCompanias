import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit rowClick when onRowClick is called', () => {
    spyOn(component.rowClick, 'emit');
    const row = { id: 1, name: 'Test' };

    component.onRowClick(row);

    expect(component.rowClick.emit).toHaveBeenCalledWith(row);
  });

  it('should retrieve nested fields using getField', () => {
    const row = { user: { name: 'John', details: { age: 30 } } };
    const field1 = 'user.name';
    const field2 = 'user.details.age';
    const field3 = 'user.nonExistent';

    expect(component.getField(row, field1)).toBe('John');
    expect(component.getField(row, field2)).toBe(30);
    expect(component.getField(row, field3)).toBeUndefined();
  });
});
