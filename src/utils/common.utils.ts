import { DailySchedule, Gym, TimeSlot } from "../domain/suggestion.domain";

export class CommonUtils {
  static filtereClassesByDateAndTime(
    weekSchedule: DailySchedule[],
    timestamp: string
  ): DailySchedule[] {
    const yyyyMmDdDateString = new Date(timestamp).toISOString().slice(0, 10);
    const hhmmAmPmString = CommonUtils.getDateAndTime(timestamp);
    return weekSchedule.filter((dailySchedule: DailySchedule) => {
      if (dailySchedule.date === yyyyMmDdDateString) {
        dailySchedule.dailyTimeSlots = dailySchedule.dailyTimeSlots.filter(
          (slot: TimeSlot) => {
            return CommonUtils.isClassTimePassed(
              slot.time,
              hhmmAmPmString,
              yyyyMmDdDateString
            );
          }
        );
        return dailySchedule;
      }
    });
  }

  static log(api: string, type: "request" | "response", event: any) {
    // sanatization for sensitve data
    console.log(`${api} ${type}: ${JSON.stringify(event)}`);
  }

  static sortClassedByScore(gymsClasses: Gym[]): Gym[] {
    return gymsClasses.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 2;
      return 0;
    });
  }

  static getDateAndTime(timestamp: string): string {
    const date = new Date(timestamp);
    const h = date.getHours();
    const m = date.getMinutes();
    const _time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
    return `${_time}`;
  }

  //   static getFullYearDate(date: Date): string {
  //     const _date =
  //       date.getFullYear() +
  //       "-" +
  //       ("0" + (new Date().getMonth() + 1)).slice(-2) +
  //       "-" +
  //       ("0" + new Date().getDate()).slice(-2);
  //     return _date;
  //   }

  // compare two time string ['2021-07-06 7:47 AM']
  //   static isFutureClass(requestTime: string, classTime: string): boolean {
  //     console.log("!!classTime.... ", classTime);
  //     console.log("!! requestTime.... ", requestTime);
  //     const isFuture = Date.parse(classTime) > Date.parse(requestTime);
  //     console.log("isFuture.... ", isFuture);
  //     return isFuture;
  //   }

  static notFoundError(entity: string) {
    const error: any = new Error();
    error["statusCode"] = 404;
    error["message"] = `${entity} not found`;
    throw error;
  }

  static serverError(error: string) {
    const err: any = new Error();
    err["message"] = `request failed due to ${error}`;
    err["statusCode"] = 500;
    throw err;
  }
  /**
   * classTime string <'10:00 AM'>
   *  requestedTime <'09:00 AM'>
   * yyyyMmDdDateString <'2021-07-06'>
   */
  static isClassTimePassed(
    classTime: string,
    requestedTime: string,
    yyyyMmDdDateString: string
  ) {
    console.log("yyyyMmDdDateString, ", yyyyMmDdDateString);
    console.log("requestedTime, ", requestedTime);
    const classDay = new Date(`${yyyyMmDdDateString} ${classTime}`);
    const requestedDay = new Date(`${yyyyMmDdDateString} ${requestedTime}`);
    return classDay > requestedDay ? true : false;
  }

 
  hasDuplicates(array: any[]): boolean {
    return new Set(array).size !== array.length;
  }
}
