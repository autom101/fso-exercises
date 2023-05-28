const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];
    expect(listHelper.dummy(blogs)).toBe(1);
  });
});

describe("totalLikes", () => {
  test("totalLikes functions correctly", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });
});
