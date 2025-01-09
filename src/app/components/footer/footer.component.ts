import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentTime: string = '';
  currentDate: string = '';

  ngOnInit(): void {
    this.updateTime();
  }

  updateTime(): void {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    this.currentTime = `${hours}:${minutes}`;
    this.currentDate = `${day}/${month}/${year}`;


    setTimeout(() => this.updateTime, 1000)
  }
}