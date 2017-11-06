const utils = require('./utils');
const expect = require('expect');


describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);
            expect(res).toBe(44).toBeA('number');
        });

        it('should add async add two number', (done)=> {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).toBe(7).toBeA('number');
                done();
            });
        });
    });

    it('should square the number', () => {
        var res = utils.square(6);
        expect(res).toBe(36).toBeA('number');
    });

    it('should async square the numer', (done) => {
        utils.asyncSquare(3, (res) => {
            expect(res).toBeA('number').toBe(9);
            done();
        });
    });
});


// it('should expect some values', () => {
//     // expect(12).toNotBe(13);
//     // expect({name: 'Kevin'}).toEqual({name: 'Kevin'})
//     // expect([2,3,4]).toExclude(5);
//     expect({
//         name: 'Andrew',
//         age: 25,
//         location: 'Philadelphia'
//     }).toInclude({
//         age: 25
//     });
// });

it('should verify firstname and lastname are set', () => {
    var initial = {location: 'Philadelphia', age: 25}
    var user = utils.setName(initial, "Kevin Zhou");
    expect(user).toBeA('object');
    expect(user.firstName).toBeA('string');
    expect(user.firstName).toBe('Kevin');
    expect(user.lastName).toBeA('string');
    expect(user.lastName).toBe('Zhou');
    expect(user).toInclude({
        firstName: 'Kevin',
        lastName: 'Zhou'
    });
});
