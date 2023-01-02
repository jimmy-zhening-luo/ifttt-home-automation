const runIfMoreThanFracHoursSinceLastRun: number = 16.0;

// queries
let lastRunIso: string = Irobot.historyOfRobotStarted[0].Timestamp;
let lastRunMoment = moment(lastRunIso);
let now = Meta.currentUserTime;

// filter logic
let timeSinceLastRunInFracHours: number = now.diff(lastRunMoment, 'hour', true);

let doRun: boolean = timeSinceLastRunInFracHours > runIfMoreThanFracHoursSinceLastRun;

if (!doRun) {
  Irobot.startRobot.skip();
}