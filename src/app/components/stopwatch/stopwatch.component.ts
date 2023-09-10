import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil, buffer, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private startTime: number = 0;
  private waitClicks$: Subject<void> = new Subject<void>();
  private elapsedTime: number = 0;

  public isRunning: boolean = false;
  public displayTime: string = '00:00:00';

  ngOnInit(): void {
    interval(1000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.isRunning) {
          this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
          this.displayTime = this.formatTime(this.elapsedTime);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startStop(): void {
    if (this.isRunning) {
      this.isRunning = false;
      this.elapsedTime = 0;
      this.displayTime = '00:00:00';
    } else {
      this.isRunning = true;
      this.startTime = Date.now() - this.elapsedTime * 1000;
    }
  }

  wait(): void {
    this.waitClicks$.next();

    this.waitClicks$
      .pipe(
        buffer(this.waitClicks$.pipe(debounceTime(300))),
        filter((clicks) => clicks.length === 2),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isRunning = false;
      });
  }

  reset(): void {
    this.isRunning = false;
    this.elapsedTime = 0;
    this.displayTime = '00:00:00';
    this.startStop();
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
