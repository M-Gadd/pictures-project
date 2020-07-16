describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
});

describe("visit the app", () => {
  it("Can fill the form", () => {
    cy.visit("/");
    // cy.visit("/");
    // cy.get("form");
  });
});
describe("visit the signup", () => {
  it("Can fill the form", () => {
    cy.visit("/signup");
    cy.get("form");
    cy.get('Input[name="FirstName"]').type("Mostafa").should("have.value", "Mostafa");
    cy.get('Input[name="LastName"]').type("Gad").should("have.value", "Gad");
    cy.get('Input[name="Email"]').type("a@a.com").should("have.value", "a@a.com");
    cy.get('Input[name="Password"]').type("whatever").should("have.value", "whatever");

    cy.server();
    cy.route({
      url: "/api/**",
      method: "POST",
      // response: { status: "Form saved!", code: 201 }
    });
    cy.get("form").submit();
  });
});
describe("visit the login", () => {
  it("Can fill the form", () => {
    cy.visit("/login");
    cy.get("form");
    cy.get('Input[name="Email"]').type("a@a.com").should("have.value", "a@a.com");
    cy.get('Input[name="Password"]').type("whatever").should("have.value", "whatever");

    cy.server();
    cy.route({
      url: "/api/**",
      method: "POST",
      // response: { status: "Form saved!", code: 201 }
    });
    cy.get("form").submit();
  });
});
describe("visit the streetArt", () => {
  it("Can fill the form", () => {
    cy.visit("/streetart");
    cy.get("Button").click({ multiple: true, force: true });
    cy.get("form");
    cy.get('Input[name="location"]').type("Cairo").should("have.value", "Cairo");
    // cy.get('Input[type="file"]').type("").should("have.value", "");

    // cy.server();
    // cy.route({
    //   url: "/api/**",
    //   method: "POST",
    //   // response: { status: "Form saved!", code: 201 }
    // });
    cy.get("form").submit();
  });
});
