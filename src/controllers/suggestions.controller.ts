import { Gym, Location } from "../domain/suggestion.domain";
import { SuggestionsService } from "../services/suggestions.service";
import { CommonUtils } from "../utils/common.utils";
import moment from "moment";

export class SuggestionsController {
  async getSuggestions(
    dateTimeStamp: string,
    requestedLocation: Location
  ): Promise<Gym[]> {
    try {
      const _requestedLocation =
        requestedLocation.latitude && requestedLocation.longitude
          ? requestedLocation
          : null;
      return await new SuggestionsService().getSuggestions(
        dateTimeStamp,
        _requestedLocation
      );
    } catch (error) {
      console.error("getSuggestions(),  error:", error);
      return error.statusCode ? error : new Error(error);
    }
  }
}
