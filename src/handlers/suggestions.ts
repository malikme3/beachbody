import { Handler, Context, Callback } from "aws-lambda";
import { SuggestionsController } from "../controllers/suggestions.controller";
import { Gym } from "../domain/suggestion.domain";
import { CommonUtils } from "../utils/common.utils";
import { Location } from "../domain/suggestion.domain";

interface HelloResponse {
  statusCode: number;
  body: { data: Gym[] };
}

const getSuggestions: Handler = async (event: any, context: Context) => {
  const { date, latitude, longitude } = event.queryStringParameters.query;
  const requestedLocation: Location = {
    latitude,
    longitude,
  };

  const resp: Gym[] | any = await new SuggestionsController().getSuggestions(
    date,
    requestedLocation
  );
  // logs monitoring
  CommonUtils.log("getSuggestions", "response", resp);
  const response: HelloResponse = {
    statusCode: resp["statusCode"] ? resp["statusCode"] : 200,
    body: {
      data: resp,
    },
  };
  return response;
};

export { getSuggestions };
