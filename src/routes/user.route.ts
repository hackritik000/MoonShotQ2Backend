import { Router } from 'express';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { userLogin } from '../controllers/user/userLogin.controller.js';
import { userLogout } from '../controllers/user/userLogout.controller.js';
import { userRegister } from '../controllers/user/userRegister.controller.js';
import { userRefreshAccessToken } from '../controllers/user/userRefreshAccessToken.controller.js';
import { userGetCurrentUser } from '../controllers/user/userGetCurrentUser.controller.js';
import { getUserName } from '../controllers/user/userGetName.js';
import { userDashboard } from '../controllers/userDashboard/userDashboard.controller.js';
import { seed } from '../controllers/seed.js';
import { generateUrl } from '../controllers/userDashboard/generateUrl.controller.js';
import { getCookieUrl } from '../controllers/userDashboard/getCookieUrl.controller.js';

// importing all users incomes

const router = Router();
router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/seed').get(seed);

/*
 ----------------------------------------
              Secured Routes
 ----------------------------------------
*/

// Profile Routes

router.route('/logout').post(userAuth, userLogout);
router.route('/refresh-token').post(userRefreshAccessToken);
router.route('/current-user').get(userAuth, userGetCurrentUser);
router.route('/get-username').get(getUserName);

// Dashboard Route
router.route('/dashboard').post(userAuth, userDashboard);
router.route('/generateUrl').post(userAuth, generateUrl);
router.route('/getUrlCookie').post(userAuth, getCookieUrl);

export default router;
