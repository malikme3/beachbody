import { Gym, Location } from "../domain/suggestion.domain";
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
      // if location provided, order by nearest location first
      if (requestedLocation) {
        availableClasses.map(
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
}
