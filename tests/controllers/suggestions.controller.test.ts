import { SuggestionsController } from "../../src/controllers/suggestions.controller";

describe("class[SuggestionsController] tests", () => {
  let suggestionsController: SuggestionsController;
  beforeEach(() => {
    suggestionsController = new SuggestionsController();
  });
  it("Controller instance should exist", () => {
    expect(suggestionsController).toBeDefined();
  });
  describe("function [getSuggestions] tests", () => {
    //TODO: controller functions testing
  });
});
