const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const HomePage = require('../pageobjects/home.page');
const { hoursMon, hoursThu, hoursWen, hoursTue, hoursFri } = require('./inputs');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open(),
        await LoginPage.login(process.env.USERNAME, process.env.PASS),
        await expect(HomePage.selectProject).toBeExisting()
    });

    it('select the project', async () => {
        await expect(browser).toHaveUrlContaining("timesheet");
        await expect(HomePage.selectProject).toBeDisplayed(),
        (await HomePage.selectProject).click(),
        await expect(HomePage.listOfProjects).toBeExisting(),
        await expect(HomePage.paytientProject).toBeDisplayed(),
        (await HomePage.paytientProject).click()
    });

    it('charge the hours', async () => {
        await expect(HomePage.paytientSelected).toBeExisting();
        let weeklyTotalHours = await HomePage.chargeHours(hoursMon, hoursTue, hoursWen, hoursThu, hoursFri); 
        await HomePage.totalHours.click();
        await expect(HomePage.totalHours).toHaveTextContaining(`${weeklyTotalHours}:00`) 
    });

    it('logout', async () => {
        await expect(HomePage.profilePic).toBeExisting(),
        (await HomePage.profilePic).click(),
        await expect(HomePage.profileMenu).toBeExisting(),
        await expect(HomePage.logoutBtn).toBeExisting(),
        (await HomePage.logoutBtn).click(),
        await expect(browser).toHaveUrlContaining("login")
    });
    browser.end();
});