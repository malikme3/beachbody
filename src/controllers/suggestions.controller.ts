import { Gym, Location } from "../domain/suggestion.domain";
import { SuggestionsService } from "../services/suggestions.service";
import { CommonUtils } from "../utils/common.utils";
import moment from "moment";
import { ErrorUtils } from "../utils/errors.utils";

export class SuggestionsController {
  async getSuggestions(
    dateTimeStamp: string,
    requestedLocation: Location
  ): Promise<Gym[]> {
    try {
      // params validation
      if (!dateTimeStamp) ErrorUtils.badRequest("getSuggestions");
      const _requestedLocation =
        requestedLocation.latitude && requestedLocation.longitude
          ? requestedLocation
          : null;
      const gyms = await new SuggestionsService().getSuggestions(
        dateTimeStamp,
        _requestedLocation
      );
      return gyms.length > 0
        ? gyms
        : (ErrorUtils.notFoundError("Gym class") as any);
    } catch (error) {
      console.error("getSuggestions(),  error:", error);
      return error.statusCode ? error : new Error(error);
    }
  }
}
