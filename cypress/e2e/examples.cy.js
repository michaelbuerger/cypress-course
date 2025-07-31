describe("Various examples", () => {
    beforeEach(() => {
        cy.visit("/examples")
    })

    it("multi-page testing", () => {
        let dataTest = "nav-why-cypress"; let path = "/";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)

        dataTest = "nav-overview"; path = "/overview";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)

        dataTest = "nav-fundamentals"; path = "/fundamentals";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)

        dataTest = "nav-forms"; path = "/forms";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)

        dataTest = "nav-component"; path = "/component";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)

        /*dataTest = "nav-examples"; path = "/examples";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)*/

        dataTest = "nav-best-practices"; path = "/best-practices";
        cy.getDataTest(dataTest).click()
        cy.location("pathname").should("equal", path)
    })

    it("intercepts", () => {
        // setup intercept preemptively (manual)
        /*cy.intercept("POST", "http://localhost:3000/examples", {
            body: {
                message: "successfully intercepted request"
            }
        })*/

        // setup intercept preemptively using fixture
        cy.intercept("POST", "http://localhost:3000/examples", {
            fixture: "example.json"
        })

        cy.getDataTest("post-button").click()
    })

    it.only("grudges", () => {
        cy.contains(/add some grudges/i)

        cy.getDataTest("grudge-list").find("li").should("have.length", 0) // should have no nested li(s)

        cy.getDataTest("grudge-input").find("input").type("some grudge")
        cy.getDataTest("add-grudge").click()

        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 1)
        })

        cy.getDataTest("grudge-input").find("input").type("another grudge")
        cy.getDataTest("add-grudge").click()

        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 2)
            cy.get("li").its(0).should("contains.text", "some grudge")
            cy.get("li").its(1).should("contains.text", "another grudge")

            cy.get("li").its(0).find("button").click()
            cy.get("li").its(0).should("contains.text", "another grudge")
        })

        cy.getDataTest("clear-grudges-button").click()
        cy.getDataTest("grudge-list").find("li").should("have.length", 0)
    })
})