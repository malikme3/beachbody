import { Gym } from "../../src/domain/suggestion.domain";
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

describe("[sortClassedByDistance tests", () => {
  it("should sory by distance", () => {
    const sortedGyms = CommonUtils.sortClassedByDistance(gymsData);
    expect(sortedGyms[0].distance).toBe(5146);
    expect(sortedGyms[2].distance).toBe(10436980);
  });
});

const gymsData: Gym[] = [
  {
    id: 200,
    city: "LA",
    name: "gym2",
    code: "102",
    score: 0.9,
    location: { latitude: 34.002827, longitude: -118.331835 },
    weekSchedule: [
      {
        id: 1,
        code: "mon",
        day: "MONDAY",
        date: "2021-07-06",
        dailyTimeSlots: [
          {
            id: "3560b2ab-f697-439c-b003-e97959432126",
            time: "2:00 PM",
            dateAndTime: "2021-07-06 2:00 PM",
            type: "general",
            available: true,
          },
          {
            id: "fd80b4e8-2822-471d-81ef-a5d833a7806a",
            time: "3:00 PM",
            dateAndTime: "2021-07-06 3:00 PM",
            type: "general",
            available: true,
          },
        ],
      },
    ],
    distance: 6172,
  },
  {
    id: 100,
    city: "LA",
    name: "gym1",
    code: "101",
    score: 0.3,
    location: { latitude: 33.9540723, longitude: 118.3636729 },
    weekSchedule: [
      {
        id: 1,
        code: "mon",
        day: "MONDAY",
        date: "2021-07-06",
        dailyTimeSlots: [
          {
            id: "c30e4023-bedb-4e25-8ef9-18945c448966",
            time: "3:00 PM",
            dateAndTime: "2021-07-06 3:00 PM",
            type: "general",
            available: true,
          },
        ],
      },
    ],
    distance: 10436980,
  },
  {
    id: 300,
    city: "LA",
    name: "gym3",
    code: "103",
    score: 0,
    location: { latitude: 33.9988632, longitude: -118.3498971 },
    weekSchedule: [
      {
        id: 1,
        code: "mon",
        day: "MONDAY",
        date: "2021-07-06",
        dailyTimeSlots: [
          {
            id: "1bc4e27c-b7b2-482e-9d8a-4b156763b76d",
            time: "3:00 PM",
            dateAndTime: "2021-07-06 3:00 PM",
            type: "general",
            available: true,
          },
        ],
      },
    ],
    distance: 5146,
  },
];
