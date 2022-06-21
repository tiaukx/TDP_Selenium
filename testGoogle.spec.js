const { Builder, By, Key } = require("selenium-webdriver");
//Builder - what builds our webpage
//By - How we select the element to click or input values into
//Key - A function that calls whatever key we want to press e.g. enter, spacebar, etc. It is your keyboard/mouse functionality

const assert = require("assert");
const { isTypedArray } = require("util/types");
//how we check something is equal to what we expect it to be equal to - for our actual test - assertions

describe("Check the search functionality in Google", function() {
    this.timeout(30000);
    //sets a timeout

    let driver;

    //builds the browser, to test on fresh browser
    //async - we don't know when it will finish
    beforeEach(async () => {
        //await - since we don't know how long it will take, we wait until it finishes so it doesn't timeout
        //new Builder - creating a new instance of Builder each time
        driver = await new Builder().forBrowser("chrome").build();
    });

    //quits the browser once done
    afterEach(async () => {
        await driver.quit();
    });

    // //where we do the test itself
    // it("Go to google and search for QA", async () => {
    //     //first we grab the URL of the page we are testing
    //     driver.get("http://www.google.co.uk");
    //     //need to click agree on a pop up, so we inspect the element on the browser to find the id / class of the button we want it to click
    //     //accepts cookies pop up, that appears on each new browser
    //     driver.findElement(By.id("L2AGLb")).click();
    //     //now we need to access the search bar, once again, inspect the element via browser to get id / class / name of element
    //     //await used to tell it to wait until our input has fully been entered
    //     await driver.findElement(By.name("q")).sendKeys("QA", Key.ENTER);
    //     //checks the title of the page to check the result is what we expect
    //     const val = await driver.wait(driver.getTitle(), 1000);
    //     //checks if the value we got is equal to what we expected
    //     assert.equal(val, "QA - Google Search")
    // });

    // it("Go to google and search for BMW", async () => {
    //     driver.get("http://www.google.co.uk");
    //     driver.findElement(By.id("L2AGLb")).click();
    //     await driver.findElement(By.name("q")).sendKeys("BMW", Key.ENTER);
    //     const val = await driver.wait(driver.getTitle(), 1000);
    //     assert.equal(val, "BMW - Google Search")
    // });

    it("After searching QA, check searchbox still contains a value of 'QA'", async () => {
        driver.get("http://www.google.co.uk");
        driver.findElement(By.id("L2AGLb")).click();
        await driver.findElement(By.name("q")).sendKeys("QA", Key.ENTER);
        const val = driver.findElement(By.xpath("//res[text()='QA']"));
        assert.equal(val, "QA");
    });

});