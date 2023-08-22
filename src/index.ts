import * as c from './constants';

interface DurationDto {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  microseconds: number;
}

export class Duration implements DurationDto {
  static HOURS_PER_DAY = c.C2;
  static MICROSECONDS_PER_DAY = c.F4;
  static MICROSECONDS_PER_HOUR = c.F6;
  static MICROSECONDS_PER_MILLISECOND = c.F1;
  static MICROSECONDS_PER_MINUTE = c.F8;
  static MICROSECONDS_PER_SECOND = c.F2;
  static MILLISECONDS_PER_DAY = c.F3;
  static MILLISECONDS_PER_MINUTE = c.F7;
  static MILLISECONDS_PER_SECOND = c.F1;
  static MINUTES_PER_DAY = c.C3;
  static MINUTES_PER_HOUR = c.C1;
  static SECONDS_PER_DAY = c.C5;
  static SECONDS_PER_HOUR = c.C4;
  static SECONDS_PER_MINUTE = c.C1;

  /** the precise duration of an year, useful for arithmetics with dates */
  static PRECISE_YEAR = Duration.of({ days: 365, hours: 6 });
  static YEAR = Duration.of({ days: 365 });
  static MONTH = Duration.of({ days: 30 });
  static DAY = Duration.of({ days: 1 });
  static HOUR = Duration.of({ hours: 1 });
  static MINUTE = Duration.of({ minutes: 1 });
  static SECOND = Duration.of({ seconds: 1 });
  static MILLISECOND = Duration.of({ milliseconds: 1 });
  static MICROSECOND = Duration.of({ microseconds: 1 });

  static ZERO = Duration.of({ microseconds: 0 });

  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;
  readonly microseconds: number;

  constructor({
    days,
    hours,
    microseconds,
    milliseconds,
    minutes,
    seconds,
  }: Partial<DurationDto>) {
    this.days = days ?? 0;
    this.hours = hours ?? 0;
    this.minutes = minutes ?? 0;
    this.seconds = seconds ?? 0;
    this.milliseconds = milliseconds ?? 0;
    this.microseconds = microseconds ?? 0;

    Object.freeze(this);
    Object.seal(this);
  }

  static of({
    days,
    hours,
    microseconds,
    milliseconds,
    minutes,
    seconds,
  }: Partial<DurationDto>) {
    return new Duration({
      days,
      hours,
      microseconds,
      milliseconds,
      minutes,
      seconds,
    });
  }

  get inDays(): number {
    return (
      this.days +
      this.hours / c.C2 +
      this.minutes / c.C3 +
      this.seconds / c.C5 +
      this.milliseconds / c.F3 +
      this.microseconds / c.F4
    );
  }

  get inHours(): number {
    return (
      this.days * c.C2 +
      this.hours +
      this.minutes / c.C1 +
      this.seconds / c.C4 +
      this.milliseconds / c.F5 +
      this.microseconds / c.F6
    );
  }

  get inMinutes(): number {
    return (
      this.days * c.C3 +
      this.hours * c.C1 +
      this.minutes +
      this.seconds / c.C1 +
      this.milliseconds / c.F1 +
      this.microseconds / c.F2
    );
  }

  get inSeconds(): number {
    return (
      this.days * c.C5 +
      this.hours * c.C4 +
      this.minutes * c.C1 +
      this.seconds +
      this.milliseconds / c.F1 +
      this.microseconds / c.F2
    );
  }

  get inMilliseconds(): number {
    return (
      this.days * c.F3 +
      this.hours * c.F5 +
      this.minutes * c.F7 +
      this.seconds * c.F1 +
      this.milliseconds +
      this.microseconds / c.F1
    );
  }

  get inMicroseconds(): number {
    return (
      this.days * c.F4 +
      this.hours * c.F6 +
      this.minutes * c.F8 +
      this.seconds * c.F2 +
      this.milliseconds * c.F1 +
      this.microseconds
    );
  }

  get isNegative(): boolean {
    return this.inMicroseconds < 0;
  }

  /**
   * Returns a new Duration representing the absolute value of this Duration.
   * The returned Duration has the same length as this one, but is always positive.
   */
  abs(): Duration {
    const _total = Math.abs(this.inMicroseconds);

    const microseconds = _total % c.F1;
    const _restMicroseconds = (_total - microseconds) / c.F1;

    const milliseconds = _restMicroseconds % c.F1;
    const _restMilliseconds = (_restMicroseconds - milliseconds) / c.F1;

    const seconds = _restMilliseconds % c.C1;
    const _restSeconds = (_restMilliseconds - seconds) / c.C1;

    const minutes = _restSeconds % c.C1;
    const _restMinutes = (_restSeconds - minutes) / c.C1;

    const hours = _restMinutes % c.C2;
    const _restHours = (_restMinutes - hours) / c.C2;

    const days = _restHours;

    const result = new Duration({
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
    });

    return result;
  }

  compareTo(other: Duration): number {
    return this.inMicroseconds - other.inMicroseconds;
  }

  multiply(factor: number): Duration {
    const total = this.inMicroseconds * factor;

    const tempDur = new Duration({
      microseconds: total,
    });

    return tempDur.abs();
  }

  divide(quotient: number): Duration {
    const total = this.inMicroseconds / quotient;

    const tempDur = new Duration({
      microseconds: total,
    });

    return tempDur.abs();
  }

  add(other: Duration): Duration {
    const total = this.inMicroseconds + other.inMicroseconds;

    const tempDur = new Duration({
      microseconds: total,
    });

    return tempDur.abs();
  }

  subtract(other: Duration): Duration {
    const total = this.inMicroseconds - other.inMicroseconds;

    const tempDur = new Duration({
      microseconds: total,
    });

    return tempDur.abs();
  }

  equals(other: Duration): boolean {
    return this.inMicroseconds === other.inMicroseconds;
  }

  greaterThan(other: Duration): boolean {
    return this.inMicroseconds > other.inMicroseconds;
  }

  lessThan(other: Duration): boolean {
    return this.inMicroseconds < other.inMicroseconds;
  }

  greaterThanOrEqual(other: Duration): boolean {
    return this.inMicroseconds >= other.inMicroseconds;
  }

  lessThanOrEqual(other: Duration): boolean {
    return this.inMicroseconds <= other.inMicroseconds;
  }

  toString(): string {
    const total = this.abs();

    type Part = { value: number; unit: string };

    const parts: Part[] = [
      { value: total.days, unit: 'd' },
      { value: total.hours, unit: 'h' },
      { value: total.minutes, unit: 'm' },
      { value: total.seconds, unit: 's' },
      { value: total.milliseconds, unit: 'ms' },
      { value: total.microseconds, unit: 'µs' },
    ];

    const filteredParts = parts.filter(part => part.value !== 0);

    return filteredParts.map(part => `${part.value}${part.unit}`).join(' ');
  }

  static between(start: Date, end: Date): Duration {
    const total = end.getTime() - start.getTime();

    const tempDur = new Duration({
      milliseconds: total,
    });

    return tempDur.abs();
  }
}
