import { NgInstantPage } from './app.po';

describe('ng-instant App', () => {
  let page: NgInstantPage;

  beforeEach(() => {
    page = new NgInstantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
