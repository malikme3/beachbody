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
  // sort by gym score
  static sortClassedByScore(gymsClasses: Gym[]): Gym[] {
    return gymsClasses.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 2;
      return 0;
    });
  }
  // sort by distance in meter[number]
  static sortClassedByDistance(gymsClasses: Gym[]): Gym[] {
    return gymsClasses.sort(
      ({ distance: distanceA }: Gym, { distance: distanceB }: Gym) => {
        if (!distanceB || !distanceA) return 0;
        if (distanceA < distanceB) return -1;
        if (distanceA > distanceB) return 2;
        return 0;
      }
    );
  }

  static getDateAndTime(timestamp: string): string {
    const date = new Date(timestamp);
    const h = date.getHours();
    const m = date.getMinutes();
    const _time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
    return `${_time}`;
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
    const classDay = new Date(`${yyyyMmDdDateString} ${classTime}`);
    const requestedDay = new Date(`${yyyyMmDdDateString} ${requestedTime}`);
    return classDay > requestedDay ? true : false;
  }
  // check if string array contain duplicates
  static checkIfDuplicateExists(ele: string[]) {
    return new Set(ele).size !== ele.length;
  }

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
}
