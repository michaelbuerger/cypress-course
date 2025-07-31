describe("fundamentals tests", () => {
    // BEST PRACTICES NOTE: make all of these longers test instead of multiple isolated, but for now this is fine

    // calls before each test
    beforeEach(() => {
        cy.visit("/fundamentals")
    })

    it("Contains correct header text", () => {
        //cy.get("[data-test='fundamentals-header']").contains("Testing Fundamentals", { matchCase: false }) // case insensitive using options object
        //cy.get("[data-test='fundamentals-header']").contains(/Testing Fundamentals/i) // case insensitive using regex
        //cy.get("[data-test='fundamentals-header']").should("contain.text", "Testing Fundamentals") // alternative to contains direct call, (this is not case insensitive, idk how to make it that way)

        // using custom command (defined in cypress/support/commands.js)
        cy.getDataTest("fundamentals-header", "").contains("Testing Fundamentals", { matchCase: false })
    })

    it("Accordion functions properly", () => {
        cy.contains("Your tests will exist in a describe block.", { matchCase: false }).should("not.be.visible")
        cy.getDataTest("accordion-item-1", "div[role=button]").click() // open
        cy.contains("Your tests will exist in a describe block.", { matchCase: false }).should("be.visible")
        cy.getDataTest("accordion-item-1", "div[role=button]").click() // close
        cy.contains("Your tests will exist in a describe block.", { matchCase: false }).should("not.be.visible")
    })
})