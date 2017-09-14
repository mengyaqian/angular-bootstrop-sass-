import { Angular2ShangPage } from './app.po';

describe('angular2-shang App', () => {
  let page: Angular2ShangPage;

  beforeEach(() => {
    page = new Angular2ShangPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
