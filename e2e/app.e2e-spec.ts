import { NgChatPage } from './app.po';

describe('ng-chat App', function() {
  let page: NgChatPage;

  beforeEach(() => {
    page = new NgChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
