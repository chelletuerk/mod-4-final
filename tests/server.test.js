const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

// describe('API Routes', function() {
describe('Server', () => {
  it('should exist', () => {
    expect(server).to.exist;
  });
});
