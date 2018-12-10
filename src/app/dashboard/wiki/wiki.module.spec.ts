import { WikiModule } from './wiki.module';

describe('WikiModule', () => {
  let wikiModule: WikiModule;

  beforeEach(() => {
    wikiModule = new WikiModule();
  });

  it('should create an instance', () => {
    expect(wikiModule).toBeTruthy();
  });
});
