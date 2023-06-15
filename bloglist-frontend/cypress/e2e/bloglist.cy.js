/* eslint-disable no-undef */
describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      username: "user1",
      name: "User1",
      password: "password1",
    };
    cy.request("POST", "http://localhost:3003/api/users", user1);
    const user2 = {
      username: "user2",
      name: "User2",
      password: "password2",
    };
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("Site opens and login shows", function () {
    cy.contains("Blog List");
    cy.contains("Login");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#Login").click();
      cy.get("#username").type("user1");
      cy.get("#password").type("password1");
      cy.get("#submit-login").click();

      cy.contains("Successfully logged in. Welcome User1!");
    });

    it("fails with incorrect credentials", function () {
      cy.get("#Login").click();
      cy.get("#username").type("user1123");
      cy.get("#password").type("passwo123rd1");
      cy.get("#submit-login").click();

      cy.contains("Incorrect credentials!");
    });
  });
});
