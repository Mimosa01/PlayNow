export class Timer {
  private static _interval: NodeJS.Timeout | null = null;
  private static _isIntervalSet = false;

  public static setTimer(callback: () => void, delay: number): void {
    if (!Timer._isIntervalSet) {
      Timer._isIntervalSet = true;
      Timer._interval = setInterval(callback, delay);
    }
  }

  public static clearInterval(): void {
    if (Timer._interval) {
      clearInterval(Timer._interval);
      Timer._interval = null;
      Timer._isIntervalSet = false;
    }
  }
}