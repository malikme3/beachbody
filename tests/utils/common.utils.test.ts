import { CommonUtils } from "../../src/utils/common.utils";

describe("[isClassTimePassed]", () => {
  it("should not false", async () => {
    const classTime = "9:00 AM";
    const requestedTime = "10:00 AM";
    const yyyyMmDdDateString = "2021-06-07";
    const test = CommonUtils.isClassTimePassed(
      classTime,
      requestedTime,
      yyyyMmDdDateString
    );
    expect(test).toBe(false);
  });

  it("should return true", async () => {
    const classTime = "04:00 PM";
    const requestedTime = "01:30 PM";
    const yyyyMmDdDateString = "2021-07-06";
    const test = CommonUtils.isClassTimePassed(
      classTime,
      requestedTime,
      yyyyMmDdDateString
    );
    expect(test).toBeTruthy();
  });
});
