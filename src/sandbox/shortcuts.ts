type Moment = moment.Moment;

interface TimeStamp<Type> {
  readonly event: string;
  readonly time: Type;
}

function formatMoment (_moment: Moment): string {
  return _moment.toString() as string;
}


const times: Array<TimeStamp<Moment> > = new Array<TimeStamp<Moment> >();

times.push({
  event: "IFTTT Applet Began Running",
  time: Meta.triggerTime as Moment
  });

times.push({
  event: "Current Runtime",
  time: Meta.currentUserTime as Moment
  });

/*
times.push({
  event: "iRobot Polled: Last Clean Start",
  time: moment(Irobot.historyOfRobotStarted[0].Timestamp as string) as Moment
});
*/

const printableTimes: Array<TimeStamp<string> > = times.map((t) => ({
  "event": t.event as string,
  "time": formatMoment(t.time as Moment) as string
  }));

const alertMessageLines: Array<string> = printableTimes.map((t) => [ t.event as string, t.time as string ].join(": "));

const alertMessage: string = alertMessageLines.join("\n");

IfNotifications.sendNotification.setMessage(alertMessage as string);
