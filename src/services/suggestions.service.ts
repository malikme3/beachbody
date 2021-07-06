import { Gym, Location } from "../domain/suggestion.domain";
import { getDistance } from "geolib";
import { getGymsSessions } from "../orm/data";
import { CommonUtils } from "../utils/common.utils";

export class SuggestionsService {
  async getSuggestions(
    requestTime: string,
    requestedLocation: Location | null
  ): Promise<Gym[]> {
    const dis = getDistance(
      { latitude: 51.5103, longitude: 7.49347 },
      { latitude: "51° 31' N", longitude: "7° 28' E" }
    );
    console.log("...\n\n...dist .", dis);
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

      // sort by score ['descending']
      const classesSortedByScore =
        CommonUtils.sortClassedByScore(filteredClasses);
      if (requestedLocation) {
        console.log("........ requestedLocation ", requestedLocation);
      }
      return classesSortedByScore;
    } catch (error) {
      console.error("Error while getSuggestions()", error);
      return CommonUtils.serverError(error) as any;
    }
  }
}
