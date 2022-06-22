const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const { isTypedArray } = require("util/types");

describe("Check the search functionality in Google", function() {
    this.timeout(30000);
    
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("Click tshirt button and click on tshirt", async () => {
        driver.get("http://automationpractice.com/index.php");

        let product;
        let productText;

        //click t shirt button
        await driver.findElement(By.xpath("/html/body/div/div[1]/header/div[3]/div/div/div[6]/ul/li[3]/a")).click();
        //click first t shirt product that loads
        await driver.findElement(By.className("button lnk_view btn btn-default")).click();
        

        //gets the product 
        product = await driver.findElement(By.tagName("h1")).getText();

        
        //clicks add to cart
        await driver.findElement(By.name("Submit")).click();
        //on pop up that appears, clicks proceed to checkout
        await driver.findElement(By.className("btn btn-default button button-medium")).click();
        //stores product name in checkout to variable
        let basket = driver.findElement(By.xpath("/html/body/div/div[2]/div/div[3]/div/div[2]/table/tbody/tr/td[2]/p/a")).getText();
        //check that basket and product matches
        assert.equal(basket, product);
    });
});