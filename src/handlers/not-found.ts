import { Handler, Context, Callback } from "aws-lambda";
import { CommonUtils } from "../utils/common.utils";

interface HelloResponse {
  statusCode: number;
  body: any;
}

const notFound: Handler = (
  event: any,
  context: Context,
  callback: Callback
) => {
  const response: HelloResponse = {
    statusCode: 404,
    body: CommonUtils.notFoundError("PATH"),
  };
};

export { notFound };
