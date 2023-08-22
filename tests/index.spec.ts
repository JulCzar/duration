import { Duration } from '../src';

describe('Duration', () => {
  it('should be able to create a duration', () => {
    const duration = Duration.of({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      milliseconds: 5,
      microseconds: 6,
    });
    expect(duration.days).toBe(1);
    expect(duration.hours).toBe(2);
    expect(duration.minutes).toBe(3);
    expect(duration.seconds).toBe(4);
    expect(duration.milliseconds).toBe(5);
    expect(duration.microseconds).toBe(6);

    expect(duration.inMicroseconds).toBe(93784005006);
  });

  it('should be able to compare durations', () => {
    const oneDay = Duration.of({ days: 1 });
    const twoDays = Duration.of({ days: 2 });

    expect(oneDay.compareTo(Duration.DAY)).toBe(0);
    expect(oneDay.compareTo(twoDays)).toBeLessThan(0);
    expect(twoDays.compareTo(oneDay)).toBeGreaterThan(0);
  });

  it('should instantiate from the diff between of two dates', () => {
    const date1 = new Date('2020-01-01T00:00:00.000Z');
    const date2 = new Date('2020-01-02T00:00:00.000Z');

    const duration = Duration.between(date1, date2);

    expect(duration.days).toBe(1);
  });

  it('should be able to stringify only util fields', () => {
    const dur1 = Duration.of({
      days: 1,
      minutes: 2,
      seconds: 3,
    });
    const dur2 = Duration.of({
      days: 5,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });

    expect(dur1.toString()).toBe('1d 2m 3s');
    expect(dur2.toString()).toBe('5d 2h 3m 4s');
  });

  it('should be able to add durations', () => {
    const dur1 = Duration.of({
      days: 1,
    });

    const dur2 = Duration.of({
      days: 4,
    });

    const dur3 = dur1.add(dur2);

    expect(dur3.days).toBe(5);
    expect(dur3.hours).toBe(0);
  });

  it('should be able to subtract durations', () => {
    const dur1 = Duration.of({
      days: 4,
    });

    const dur2 = Duration.of({
      days: 1,
    });

    const dur3 = dur1.subtract(dur2);

    expect(dur3.days).toBe(3);
    expect(dur3.hours).toBe(0);
  });

  it('should be able to multiply durations', () => {
    const dur1 = Duration.of({
      days: 4,
    });

    const dur3 = dur1.multiply(2);

    expect(dur3.days).toBe(8);
    expect(dur3.hours).toBe(0);
  });

  it('should be able to divide durations', () => {
    const dur1 = Duration.of({
      days: 4,
    });

    const dur3 = dur1.divide(2);

    expect(dur3.days).toBe(2);
    expect(dur3.hours).toBe(0);
  });

  it('should be able to calculate complex durations in days', () => {
    const dur = Duration.of({
      days: 15,
      hours: 23,
      minutes: 59,
      seconds: 60,
    });

    expect(dur.inDays).toBe(16);
  });

  it('should be able to calculate complex durations in hours', () => {
    const dur = Duration.of({
      days: 3,
    });

    expect(dur.inHours).toBe(72);
  });

  it('should be able to calculate complex durations in minutes', () => {
    const dur = Duration.of({
      days: 3,
    });

    expect(dur.inMinutes).toBe(4320);
  });

  it('should be able to calculate complex durations in seconds', () => {
    const dur = Duration.of({
      days: 3,
    });

    expect(dur.inSeconds).toBe(259200);
  });

  it('should be able to calculate complex durations in milliseconds', () => {
    const dur = Duration.of({
      days: 3,
    });

    expect(dur.inMilliseconds).toBe(259200000);
  });

  it('should be able to understand that the duration is negative', () => {
    const dur = Duration.of({
      days: -3,
    });

    expect(dur.isNegative).toBe(true);
  });

  it('should be able to compare for equality', () => {
    const dur1 = Duration.of({
      days: 3,
    });

    const dur2 = Duration.of({
      days: 3,
    });

    const dur3 = Duration.of({
      days: 4,
    });

    expect(dur1.equals(dur2)).toBe(true);
    expect(dur1.equals(dur3)).toBe(false);
  });

  it('should be able to compare if it is greater', () => {
    const dur1 = Duration.of({
      days: 3,
    });

    const dur2 = Duration.of({
      days: 4,
    });

    expect(dur1.greaterThan(dur2)).toBe(false);
    expect(dur2.greaterThan(dur1)).toBe(true);
  });

  it('should be able to compare if it is greater or equal', () => {
    const dur1 = Duration.of({
      days: 3,
    });

    const dur2 = Duration.of({
      days: 4,
    });

    expect(dur1.greaterThanOrEqual(dur2)).toBe(false);
    expect(dur2.greaterThanOrEqual(dur1)).toBe(true);
    expect(dur1.greaterThanOrEqual(dur1)).toBe(true);
  });

  it('should be able to compare if it is less', () => {
    const dur1 = Duration.of({
      days: 3,
    });

    const dur2 = Duration.of({
      days: 4,
    });

    expect(dur1.lessThan(dur2)).toBe(true);
    expect(dur2.lessThan(dur1)).toBe(false);
  });

  it('should be able to compare if it is less or equal', () => {
    const dur1 = Duration.of({
      days: 3,
    });

    const dur2 = Duration.of({
      days: 4,
    });

    expect(dur1.lessThanOrEqual(dur2)).toBe(true);
    expect(dur2.lessThanOrEqual(dur1)).toBe(false);
    expect(dur1.lessThanOrEqual(dur1)).toBe(true);
  });
  const duration = Duration.of({
    days: 1,
    hours: 2,
    minutes: 3,
    seconds: 4,
    milliseconds: 5,
  });

  console.log(duration.inMilliseconds);
});
