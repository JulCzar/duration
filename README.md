# Duration

## A dart inspired approach to work with durations.

This package is heavily inspired by the dart Duration class. It is a wrapper around the Duration class with some additional features.

### Installation

```bash
npm install @julczar/duration
```

or with yarn

```bash
yarn add @julczar/duration
```

### Features

- Calculate the duration between two dates
- Calculate the absolute duration of an complex number of days, hours, minutes, seconds, milliseconds and or microseconds
- Do calculations with durations created by this package
- Convert a duration to a human readable string
- Compare two durations

### What this package is not supposed to do

- Calculate the duration between two dates with different timezones
- Instantiate a duration from a string
- Do calculations with durations created by the dart Duration class

### Why this package?

There are multiple packages out there that work with durations in different ways. Some cache packages tend to work with minutes for API requests and others milliseconds, but what if you want to work with seconds? hours? days? Or receive a weird duration in milliseconds from an external source and format a readable string with the absolute time of this weird millisecond integer. This package is supposed to be a wrapper around the dart Duration class with some additional features.

### Usage

#### Calculate the duration between two dates

```ts
import { Duration } from '@julczar/duration';

const distance = Duration.between(
  new Date('2021-01-01'),
  new Date('2021-01-02')
);

console.log(distance.inDays); // 1
console.log(distance); // 1d
```

#### Calculate the absolute duration of an complex number of days, hours, minutes, seconds, milliseconds and or microseconds

```ts
import { Duration } from '@julczar/duration';

const duration = Duration.of({
  days: 1,
  hours: 2,
  minutes: 3,
  seconds: 4,
  milliseconds: 5,
});

console.log(duration.inMilliseconds); // 93784005
console.log(duration.toString()); // 1d 2h 3m 4s 5ms
```

#### Do calculations with durations created by this package

```ts
import { Duration } from '@julczar/duration';

const duration = Duration.of({
  days: 1,
});

const duration2 = Duration.of({
  hours: 2,
});

const duration3 = duration.add(duration2);

console.log(duration3.inHours); // 26
console.log(duration3.toString()); // 1d 2h
```
