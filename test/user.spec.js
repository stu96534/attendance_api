const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const app = require('../app')
const helpers = require('../helpers');
const should = chai.should()
const expect = chai.expect;
const db = require('../models')
const passport = require('../config/passport');
const { before, it, after } = require('node:test');

describe('# current_user', () => {

  context('# GET', () => {

    describe('GET /api/current_user', () => {
      before(async() => {
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
        await db.User.destroy({where: {},truncate: true, force: true});
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });

        const admin = await db.User.create({name: admin})
        this.authenticate = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          callback(null, {...admin}, null);
          return (req, res, next) => {}
        });
        
      })

      it(' - successfully', (done) => {
        request(app)
        .get('/api/current_user')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
        })
      })

      after(async () => {

      })
    })
  })
})