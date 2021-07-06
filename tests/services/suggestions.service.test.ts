import { SuggestionsService } from "../../src/services/suggestions.service";

describe("class[SuggestionsService] tests", () => {
  let suggestionsService: SuggestionsService;
  beforeEach(() => {
    suggestionsService = new SuggestionsService();
  });
  it("Service should exist", () => {
    expect(suggestionsService).toBeDefined();
  });
  describe("function [getSuggestions] tests", () => {
    //TODO: service functions testing
  });
});
