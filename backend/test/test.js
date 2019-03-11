const { generateMessage } = require('../server/utils/messages');
const moment = require('moment');
const expect = require('chai').expect;

describe('Testing Utils', () => {

    it('Test GenerateMessage', function(){

        let createdAt =  moment((new Date().getTime())).format('h:mm a');
        let message = generateMessage('yemwl', 'Testing');

        expect(typeof message).to.be.equal('object');
        expect(message).to.have.all.keys('username','text','createdAt');
        expect(message).to.be.eql({username: 'yemwl', text: 'Testing', createdAt: createdAt});

    });


})