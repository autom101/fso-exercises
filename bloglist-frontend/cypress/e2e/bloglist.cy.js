/* eslint-disable no-undef */
describe("Bloglist app", function () {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Site opens", () => {
    cy.contains("Blog List");
    cy.contains("Login");
  });
});
