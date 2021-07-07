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
      const filteredClasses: Gym[] = [];
      gymsWeekSessions.forEach((gym: Gym) => {
        const distance = (gym["weekSchedule"] =
          CommonUtils.filtereClassesByDateAndTime(
            gym.weekSchedule,
            requestTime
          ));
        if (gym["weekSchedule"][0]?.dailyTimeSlots.length > 0) {
          filteredClasses.push(gym);
        }
      });

      if (requestedLocation) {
        filteredClasses.map(
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
        // sorted gyms classes based on distance[base on corrdinates]
        return CommonUtils.sortClassedByDistance(filteredClasses);
      }

      // sort by score ['descending']
      const classesSortedByScore =
        CommonUtils.sortClassedByScore(filteredClasses);
      return classesSortedByScore;
    } catch (error) {
      console.error("Error while getSuggestions()", error);
      return CommonUtils.serverError(error) as any;
    }
  }
}
