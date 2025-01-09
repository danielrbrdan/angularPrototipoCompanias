import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnDestroy {
  date: Date = new Date();
  interval!:  ReturnType<typeof setInterval>;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {
    this.zone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.date = new Date();
        this.changeDetectorRef.detectChanges();
      }, 1000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
