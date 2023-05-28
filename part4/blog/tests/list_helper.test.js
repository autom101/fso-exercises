const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];
    expect(listHelper.dummy(blogs)).toBe(1);
  });
});
