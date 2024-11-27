const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/user');


const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 * 
 *  */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized. Access token is missing or invalid.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Unauthorized
 *               message:
 *                 type: string
 *                 example: Access token is missing or invalid.
 *     ValidationError:
 *       description: Validation error. Missing or invalid fields.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: ValidationError
 *               message:
 *                 type: string
 *                 example: Invalid or missing required fields.
 *     InternalServerError:
 *       description: Internal server error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: InternalServerError
 *               message:
 *                 type: string
 *                 example: An unexpected error occurred.
 */

// User registration
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User details for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *              - username
 *              - email
 *              - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               username:
 *                 type: string
 *               email:
 *                  type: string
 *                  format: email
 *               password:
 *                 type: string
 *                 format: password
 *               tasks:
 *                  type: array
 *                  items:
 *                      type: string
 *                      format: uuid
 *                      description: Object ID referencing a task
 *           example:
 *              name: Salawu O. Joseph
 *              username: salawu
 *              email: masterjoe@example.com
 *              tasks:
 *                  - "64ad1c12345678abcd901234"
 *                  - "64ad1c22345678abcd901235"
 *   
 *     responses:
 *       '200':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 * 
 */     
// User registration
router.post('/register', registerUser);


// User Login
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login endpoint
 *     tags: [Users]
 *     requestBody:
 *       description: User details for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *           example:
 *             email: masterjoe@example.com
 *             password: securepassword123
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */


// User login
router.post('/login', loginUser);


//User profile route
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get users details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] 
 *     content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Full name of the user
 *                     username:
 *                       type: string
 *                       description: Username of the user
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email address of the user
 *                     tasks:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uuid
 *                         description: Task IDs associated with the user
 *               
 *     responses:
 *       '200':
 *         description:  Successfully fetched user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *       
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 * 
 */     



// Fetch user details (protected route)
router.get('/profile', getUser);

module.exports = router;
