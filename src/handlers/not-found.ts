import { Handler, Context, Callback } from "aws-lambda";
import { CommonUtils } from "../utils/common.utils";

interface HelloResponse {
  statusCode: number;
  body: any;
}

const notFound: Handler = (event: any, context: Context) => {
  CommonUtils.log("getSuggestions", "request", event.request);
  const response: HelloResponse = {
    statusCode: 404,
    body: CommonUtils.notFoundError("PATH"),
  };
  return response as any;
};

export { notFound };
