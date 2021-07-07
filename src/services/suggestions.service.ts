import { Gym, Location, TimeSlot } from "../domain/suggestion.domain";
import { getDistance } from "geolib";
import { getGymsSessions } from "../orm/data";
import { CommonUtils } from "../utils/common.utils";

export class SuggestionsService {
  async getSuggestions(
    requestTime: string,
    requestedLocation: Location | null
  ): Promise<Gym[]> {
    try {
      const gymsWeekSessions = await getGymsSessions();
      const availableClasses: Gym[] = [];
      gymsWeekSessions.forEach((gym: Gym) => {
        gym["weekSchedule"] = CommonUtils.filtereClassesByDateAndTime(
          gym.weekSchedule,
          requestTime
        );
        if (gym["weekSchedule"][0]?.dailyTimeSlots.length > 0) {
          availableClasses.push(gym);
        }
      });
      /**  if location corrdinate are provided in request &&
       *    more than one classes are available for same timeSlot
       *    then order by nearest location first
       */
      if (
        requestedLocation &&
        this.checkIfMultipleClassExistForSameTime(availableClasses)
      ) {
        const times = availableClasses.map(
          (gym: Gym) =>
            (gym["distance"] = getDistance(
              {
                latitude: requestedLocation.latitude,
                longitude: requestedLocation.longitude,
              },
              {
                latitude: gym.location.latitude,
                longitude: gym.location.longitude,
              }
            ))
        );
        // sorted gyms classes based on distance[base on corrdinates] and return
        return CommonUtils.sortClassedByDistance(availableClasses);
      }

      // sort by score ['descending']
      const classesSortedByScore =
        CommonUtils.sortClassedByScore(availableClasses);
      return classesSortedByScore;
    } catch (error) {
      console.error("Error while getSuggestions()", error);
      return CommonUtils.serverError(error) as any;
    }
  }

  // check if more than one class exist for same time
  checkIfMultipleClassExistForSameTime(availableClasses: Gym[]): boolean {
    const allAvailableClassesTimes: string[] =
      this.getTimesForClasses(availableClasses);
    const isMultiClasses = CommonUtils.checkIfDuplicateExists(
      allAvailableClassesTimes
    );
    console.log("Multiple classes/timeSlot check flag: ", isMultiClasses);
    return isMultiClasses;
  }

  // return any of times[string] for all classes
  getTimesForClasses(gyms: Gym[]): string[] {
    const classestTimes: string[] = [];
    const p = gyms.forEach((gym: Gym) => {
      const timeSlots = gym.weekSchedule[0].dailyTimeSlots;
      const mapped = timeSlots.forEach((ts: TimeSlot) =>
        classestTimes.push(ts.time)
      );
    });
    return classestTimes;
  }
}
