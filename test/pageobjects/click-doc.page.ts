import { ChainablePromiseElement } from 'webdriverio';
import { assert, expect } from 'chai';
import Page from './page.js';


class ClickDocPage extends Page {

    public open() {
        return super.open('login');
    }
    public get acceptCookiesBtn() {
        return $("//button[@class='consent-button agree-consent--all']");
    }

    public get searchInputField() {
        return $("input[placeholder='Fachbereich, Name des Arztes, Praxis oder Einrichtung']");
    }

    public get searchBtn() {
        return $("#search-button");
    }

    public get locationTextField() {
        return $("input[placeholder='Ort, PLZ oder Stadtteil']");
    }


    public get addressText() {
        return $("p[data-automation='Address - Street House']");
    }
    public get suggestedSearchItem() {
        return $("//span[contains(text(),'Peter')]");
    }

    public get physicianNameText() {
        return $("//h1[normalize-space()='Dr. Peter Test']");
    }

    public get morningstartTime() {
        return $("(//div[@class='text-day-hour__item current-date first ng-star-inserted']//div)[1]");
    }

    public get morningEndTime() {
        return $("(//div[@class='text-day-hour__item current-date first ng-star-inserted']//div)[3]");
    }

    public get afternoonStartTime() {
        return $("(//div[@class='text-day-hour__item current-date ng-star-inserted']//div)[1]");
    }

    public get afternoonEndTime() {
        return $("(//div[@class='text-day-hour__item current-date ng-star-inserted']//div)[3]");
    }


    public get currentDate() {
        return $("//div[@class='text-day__item--text current-date']")
    }


    public async performSearch(searchTerm: string, location: string) {
        await this.acceptCookiesBtn.click();
        await this.locationTextField.addValue(location);
        await this.searchInputField.addValue(searchTerm);
        (await this.searchInputField).waitForDisplayed();
        await this.suggestedSearchItem.click();

    }

    public async validateSearchResults() {
        let physicianName = await (await this.physicianNameText).getText();
        expect(physicianName).to.contains('Peter Test');
        let AddressText = await (await this.addressText).getText();
        expect(AddressText).to.contains('Blücherstraße');

        await this.morningstartTime.scrollIntoView();

        console.log((await (await this.currentDate).getText()).length);


        if (await (await this.currentDate).getText() === 'Mi.') {
            let morningstartTime: any = await (await this.morningstartTime).getText();

            expect(Number(morningstartTime.split('Uhr')[0].split(':')[0])).to.be.equal(9)

            let morningEndTime: any = await (await this.morningEndTime).getText();
            expect(Number(morningEndTime.split('Uhr')[0].split(':')[0])).to.be.equal(14)
        } else {
            let morningstartTime: any = await (await this.morningstartTime).getText();

            expect(Number(morningstartTime.split('Uhr')[0].split(':')[0])).to.be.equal(9)

            let morningEndTime: any = await (await this.morningEndTime).getText();
            expect(Number(morningEndTime.split('Uhr')[0].split(':')[0])).to.be.equal(12)


            let afternoonStartTime: any = await (await this.afternoonStartTime).getText();
            expect(Number(afternoonStartTime.split('Uhr')[0].split(':')[0])).to.be.equal(14)


            let afternoonEndTimeTime: any = await (await this.afternoonEndTime).getText();
            expect(Number(afternoonEndTimeTime.split('Uhr')[0].split(':')[0])).to.be.equal(18)
        }


    }


}

export default new ClickDocPage();
