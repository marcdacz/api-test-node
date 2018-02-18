let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = 'https://jsonplaceholder.typicode.com';

chai.use(chaiHttp);

describe('Blogs Tests', () => {
	it('GET /posts', (done) => {
		chai.request(server)
			.get(`/posts`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.above(10);
              done();
            });
	});

	it('GET /posts/{id}', (done) => {
		let expectedId = 1;
		chai.request(server)
			.get(`/posts/${expectedId}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.id.should.be.eql(expectedId);
              done();
            });
	});

	it('POST /posts', (done) => {
		let blog = { 
			userId: 1, 
			title: 'my awesome post', 
			body: 'this is my awesome post!'
		};		
		chai.request(server)
			.post(`/posts`)
			.send(blog)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
              done();
            });
	});

	it('PUT /posts/{id}', (done) => {
		let expectedTitle = 'my awesome updated post';
		let expectedBody = 'this is my awesome updated post!';
		let blog = { 
			userId: 1, 
			title: expectedTitle, 
			body: expectedBody
		};		
		chai.request(server)
			.put(`/posts/1`)
			.send(blog)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.title.should.be.eql(expectedTitle);
				res.body.body.should.be.eql(expectedBody);
              done();
            });
	});

	it('DEL /posts/{id}', (done) => {
		chai.request(server)
			.del(`/posts/1`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.empty;
              done();
            });
	});
});