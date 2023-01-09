import moment from 'moment';
type Moment = moment.Moment;


interface Timer {
  readonly Timestamp: string;
}

class Meta {
  static get triggerTime(): Moment {
    return moment("2022") as Moment;
  }
}
class Irobot {
  static get cleanByRoom(): Irobot {
    return new this;
  }

  skip() {
    // do nothing
  }

  static get historyOfRobotStarted(): Array<Timer> {
    return [
      {
        Timestamp: String()
      }
    ]
  }
}

interface Config {
  readonly version: number;
  readonly [prop: string]: any;
}

const config: Config = {
  version: 2.0,
  minHoursSinceLastRun: 48,
  overrides: {
    vacation: false
  }
};

interface LatestRuns<Type> {
  readonly last: Type;
  readonly secondLast?: Type;
  readonly [prop: string]: Type | undefined;
}

const runs: LatestRuns<Moment> = {
  last: moment(Irobot.historyOfRobotStarted[0].Timestamp as string) as Moment
};

function hoursSince(past: Moment): number {
  const now: Moment = Meta.triggerTime as Moment;
  return now.diff(past as Moment, "hour", true) as number;
}

if (hoursSince(runs.last) < config.minHoursSinceLastRun) {
  Irobot.cleanByRoom.skip();
}
