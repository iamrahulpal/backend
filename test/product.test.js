// postRoutes.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Posts API", () => {
    it('should create a new post', (done) => {
        chai
          .request(app)
          .post('/posts')
          .send({
            content: 'Sample post content 456',
            category: 'Electronics', // Replace with a valid Category ID
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('type').equal('Success');
            res.body.should.have.property('data').equal('Post created successfully.')
            done();
          });
      });
      it('should delete a  post', (done) => {
        chai
          .request(app)
          .post('/posts/653a5927d458b11935761f7f')
          .send({})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('type').equal('Success');
            res.body.should.have.property('data').equal('Post has been deleted successfully')
            done();
          });
      });
      it('should update a  post', (done) => {
        chai
          .request(app)
          .put('/posts/653a594e1c20ba9caac51799')
          .send({
            content: "test update"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('type').equal('Success');
            res.body.should.have.property('data').equal('Post has been updated successfully')
            done();
          });
      });
      
});
