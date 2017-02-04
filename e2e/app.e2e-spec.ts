import { MyProfilePage } from './app.po';

describe('my-profile App', function() {
  let page: MyProfilePage;

  beforeEach(() => {
    page = new MyProfilePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
