const config: any = {
  minAgoLastRunH: 48,
  runIfQueryFails: false
};

let success: boolean = false;
type Moment = moment.Moment;
const minAgoLastRunM: number = config
  .minAgoLastRunH * 60;
const errorM: number = 5;
const now: Moment = Meta.triggerTime;
let lastRun: Moment = moment()
  .subtract(
    minAgoLastRunM + errorM, "minutes");

try {
  const lastRunString: string = Irobot
    .historyOfJobComplete[0]
    .Timestamp;
  lastRun = moment(lastRunString);
  success = true;
}
catch (e) {
  success = false;
  const message: string = "Failed to get time last run. Caught error: " + e;
  IfNotifications.sendNotification
    .setMessage(message);
}

if (success === true
|| config.runIfQueryFails === true
) {
  const agoLastRunM: number = now
    .diff(lastRun, "minutes", true);
  const agoLastRunH: number = (
    agoLastRunM / 60);
  if (agoLastRunM > minAgoLastRunM) {
    const message: string = String(
      "Cleaning started. It's been "
      + agoLastRunH.toString()
      + " hours since last run, which exceeds the minimum "
      + config.minAgoLastRunH.toString()
      + " hours required since last run."
    );
    IfNotifications.sendNotification
      .setMessage(message);
  }
  else {
    // Filter Condition Met
    Irobot.cleanByRoom.skip();
    // Filter Condition Met
    const message: string = String(
      "Cleaning skipped. It's been "
      + agoLastRunH.toString()
      + " hours since last run, which is under the minimum "
      + config.minAgoLastRunH.toString()
      + " hours required since last run."
    );
    IfNotifications.sendNotification
      .setMessage(message);
  }
}
