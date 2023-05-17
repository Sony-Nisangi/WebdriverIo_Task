 import ClickDocPage  from '..//pageobjects//click-doc.page.js';
import { assert, expect } from 'chai';


describe('Click-doc Software Test Suite : ', () => {

    before('Navigate to ClickDoc Site', async () => {
        await driver.maximizeWindow();
        await driver.url('https://demo.clickdoc.de/cd-de/')
        let ClickDocPageTitle = await driver.getTitle();
        expect(ClickDocPageTitle).to.contains('CLICKDOC')
    });
    it('ClickDoc Test case', async () => {
        await ClickDocPage.performSearch('Peter Test', 'Neuwied');
        await ClickDocPage.validateSearchResults();
        
    });

});