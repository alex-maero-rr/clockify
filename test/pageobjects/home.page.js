const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {

  get selectProject () {
    return $('#layout-main > div > timesheet2 > div > div > div > div:nth-child(2) > div > table > tbody > tr.timesheet-row-component.ng-star-inserted > td.cl-px-lg-3.cl-cut-text-wrapper-td.ng-star-inserted > div > div > a > span');
  }

  get listOfProjects () {
    return $('#layout-main > div > timesheet2 > div > div > div > div:nth-child(2) > div > table > tbody > tr.timesheet-row-component.ng-star-inserted > td.cl-px-lg-3.cl-cut-text-wrapper-td.ng-star-inserted > div > div > project-picker > section')
  }

  get paytientProject () {
    return $('#layout-main > div > timesheet2 > div > div > div > div:nth-child(2) > div > table > tbody > tr.timesheet-row-component.ng-star-inserted > td.cl-px-lg-3.cl-cut-text-wrapper-td.ng-star-inserted > div > div > project-picker > section > ng-scrollbar > div > div > div > div > section > div > section > div:nth-child(3) > div.cl-d-block.cl-collapse > div > div > div > button')
  }

  get paytientSelected () {
    return $('#layout-main > div > timesheet2 > div > div > div > div:nth-child(2) > div > table > tbody > tr.timesheet-row-component.ng-star-inserted.timesheet-row-component-with-project > td.cl-px-lg-3.cl-cut-text-wrapper-td.ng-star-inserted > div > div > a > span:nth-child(1)')
  }

  get totalHours () {
    return $('#layout-main > div > timesheet2 > div > div > div > div:nth-child(2) > div > table > tbody > tr.timesheet-row-component.ng-star-inserted.timesheet-row-component-with-project > td.cl-timesheet-total-td.cl-pr-lg-2.ng-star-inserted > div > span')
  }

  get profilePic () {
    return $('#topbar-menu > div > div.cl-d-flex.cl-align-items-center.cl-justify-content-end.cl-cut-text-wrapper > div > app-user-settings > div > a > avatar > img')
  }

  get profileMenu () {
    return $('#topbar-menu > div > div.cl-d-flex.cl-align-items-center.cl-justify-content-end.cl-cut-text-wrapper > div > app-user-settings > div > div > div.cl-dropdown-menu-header > div > div.cl-cut-text.cl-h4.cl-mb-2.cl-text-dark')
  }

  get logoutBtn () {
    return $('#topbar-menu > div > div.cl-d-flex.cl-align-items-center.cl-justify-content-end.cl-cut-text-wrapper > div > app-user-settings > div > div > a:nth-child(9)')
  }

  async chargeHours(monday, tuesday, wednesday, thursday, friday) {
    let weeklyTotalHours = 0
    const days = [monday, tuesday, wednesday, thursday, friday];
    for (let i = 2; i <= days.length + 1; i++) {
      const uniqueDay = $(`#layout-main > div > timesheet2 > div > div > div > div:nth-child(2) > div > table > tbody > tr.timesheet-row-component.ng-star-inserted.timesheet-row-component-with-project > td:nth-child(${i}) > time-duration > input`)
      await uniqueDay.setValue(days[i-2]);
      await browser.pause(500)
      weeklyTotalHours = weeklyTotalHours + Number(days[i-2])
    }
    return weeklyTotalHours / 100
  }
}

module.exports = new HomePage();
