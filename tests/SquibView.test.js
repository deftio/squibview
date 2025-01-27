import SquibView from '../src/squibview';
// Prevent scrollIntoView error in jsdom
Element.prototype.scrollIntoView = () => {};

describe('SquibView', () => {


    // version()
    test('should return version', () => {
        expect(SquibView.version.url).toBe('https://github.com/deftio/squibview');
    });

});