const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const csurf = require('csurf');

const csrfProtection = csurf();

const controller = require('../controllers/source.controller');

// auth middleware to require auth and role
const auth = require('../middlewares/auth.middleware');
const validator = require('../validators/source.validate');

router.get('/', controller.index);

// this route require authentication and has one of the role of list [ 'uploader', 'admin' ]
router.get(
    '/upSource',
    csrfProtection,
    auth.requireAuth,
    auth.requireRole([ 'uploader', 'admin' ]),
    controller.upSource
);

router.post(
    '/upSource',
    auth.requireAuth,
    auth.requireRole([ 'uploader', 'admin' ]),
    multipartMiddleware,
    validator.validate,
    csrfProtection,
    controller.postUpSource
);

router.post('/upSource', controller.postUpSource);

router.get('/view/:id', controller.viewSource);

router.get('/delete/:id', controller.deleteSource);

module.exports = router;