const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const { isTypedArray } = require("util/types");

describe("Check the search functionality in Google", function() {
    this.timeout(80000);
    
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().setTimeouts({implicit:10000});
    });

    // afterEach(async () => {
    //     await driver.quit();
    // });

    it("Click tshirt button and click on tshirt", async () => {
         
        driver.get("http://automationpractice.com/index.php");

        let product;
        let productText;

        //click t shirt button
        await driver.findElement(By.xpath("/html/body/div/div[1]/header/div[3]/div/div/div[6]/ul/li[3]/a")).click();
        //click first t shirt product that loads
        await driver.findElement(By.className("button lnk_view btn btn-default")).click();
        
        //gets the products H1 tag
        product = await driver.findElement(By.xpath('/html/body/div/div[2]/div/div[3]/div/div/div/div[3]/h1'));
        //stores H1 tag in text
        productText = await driver.wait(product.getText(), 1000);


        //clicks add to cart
        await driver.findElement(By.name("Submit")).click();
        //on pop up that appears, clicks proceed to checkout


        await driver.findElement(By.className("btn btn-default button button-medium")).click();


        let basket;
        let basketText;
        //stores product name in checkout to variable
        basket = driver.findElement(By.xpath("/html/body/div/div[2]/div/div[3]/div/div[2]/table/tbody/tr/td[2]/p/a"));
        basketText = await basket.getText();

        //check that basket and product matches
        assert.equal(basketText, productText);
    });
});