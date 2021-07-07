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
  const query: any = event.queryStringParameters;
  // for logs audit
  CommonUtils.log("getSuggestions", "request", event.requestContext);
  const resp: Gym[] | any = await new SuggestionsController().getSuggestions(
    query.date,
    { latitude: query.latitude, longitude: query.longitude } as any
  );
  // logs monitoring
  CommonUtils.log("getSuggestions", "response", resp);
  const response: HelloResponse = {
    statusCode: resp["statusCode"] ? resp["statusCode"] : 200,
    body: {
      data: resp,
    },
  };
  return JSON.stringify(response);
};

export { getSuggestions };
