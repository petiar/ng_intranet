export class TimesheetModel {
  private userID: string;
  private date: string;
  private hours: number;
  private task: number;
  private project: number;

  constructor(
    userID,
    date,
    hours,
    task,
    project
  ) {
    this.userID = userID;
    this.date = date;
    this.hours = hours;
    this.task = task;
    this.project = project;
  }
}
