describe("forms tests", () => {
    beforeEach(() => {
        cy.visit("/forms")
    })

    it("Test subscribe form", () => {
        cy.contains(/testing forms/i)

        cy.getDataTest("subscribe-form").find("input").as("input")
        cy.getDataTest("subscribe-button").as("button")

        // valid email
        cy.get("@input").type("valid@gmail.com")
        cy.contains("Successfully subbed", { matchCase: false }).should("not.exist")
        cy.get("@button").click()
        cy.contains("Successfully subbed", { matchCase: false }).should("exist")
        cy.wait(3000) // see forms/page.jsx, literal 3000 ms wait
        cy.contains("Successfully subbed", { matchCase: false }).should("not.exist")

        // invalid email
        cy.get("@input").type("invalid@gmail.io")
        cy.contains("Invalid email", { matchCase: false }).should("not.exist")
        cy.get("@button").click()
        cy.contains("Invalid email", { matchCase: false }).should("exist")
        cy.wait(3000)
        cy.contains("Invalid email", { matchCase: false }).should("not.exist")

        // empty input
        cy.contains("fail!", { matchCase: false }).should("not.exist")
        cy.get("@button").click()
        cy.contains("fail!", { matchCase: false }).should("exist")
        cy.wait(3000)
        cy.contains("fail!", { matchCase: false }).should("not.exist")
    })
})