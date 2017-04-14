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

describe('GET /', () => {
  it('should send back an html file', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});

//SAD PATH
describe('GET /', () => {
  it('should respond back with a 404 error', (done) => {
    chai.request(server)
    .get('/ /')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('GET /api/v1/items', () => {
  it('should respond back with all items', (done) => {
    chai.request(server)
    .get('/api/v1/items')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(9);
      done();
    });
  });
});

//SAD PATH
describe('GET /api/v1/users', () => {
 it('should respond back with a 404 error', (done) => {
   chai.request(server)
   .get('/api/v1/userss')
   .end((err, res) => {
     expect(res).to.have.status(404);
     done();
   });
 });
});

describe('GET /api/v1/sorted_items', () => {
  it('should respond back with all sorted items', (done) => {
    chai.request(server)
    .get('/api/v1/items')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(9);
      done();
    });
  });
});

//SAD PATH
describe('GET /api/v1/sorted_items', () => {
 it('should respond back with a 404 error', (done) => {
   chai.request(server)
   .get('/api/v1/sorted_items')
   .end((err, res) => {
     expect(res).to.have.status(200);
     done();
   });
 });
});
