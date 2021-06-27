
const router = require("express-promise-router")()
const userController = require('../controllers/user')
const notificationController = require('../controllers/notification')

const passport = require('passport')
require('../middlewares/passport')

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), userController.getAllUser)
router.route('/find')
    .get(userController.findUserByPhone)

/* Notification area */
router.route('/notification')
    .get(passport.authenticate('jwt', { session: false }), notificationController.getAllNotification)
    .post(passport.authenticate('jwt', { session: false }), notificationController.addNotification);
router.route('/notification/:IDNotification')
    .put(passport.authenticate('jwt', { session: false }), notificationController.updateNotification)
    .delete(passport.authenticate('jwt', { session: false }), notificationController.deleteNotification)
router.route('/notification-all')
    .put(passport.authenticate('jwt', { session: false }), notificationController.updateAllNotification)
router.route('/notification-all/:IDUser')
    .delete(passport.authenticate('jwt', { session: false }), notificationController.deleteAllNotification)
router.route('/notification-newest')
    .get(passport.authenticate('jwt', { session: false }), notificationController.getNewestNotification)
/* Notification area */

/* Authorization area */
router.route('/api/auth/profile')
    .post(passport.authenticate('jwt', { session: false }), userController.returnUserByToken)
router.route('/authentication/activate/:tokenUser')
    .get(userController.activeAccount)
router.route('/activate-password/:tokenUser')
    .post(userController.activePassword)
router.route('/forgot-password')
    .post(userController.forgotPassword)
router.route('/signin')
    .post(passport.authenticate('local', { session: false }), userController.signIn)
router.route('/auth/google')
    .post(passport.authenticate('google-token', { session: false }), userController.authGoogle)
router.route('/auth/google-mobile')
    .post(userController.authGoogleMobile)
router.route('/auth/facebook')
    .post(passport.authenticate('facebook-token', { session: false }), userController.authFacebook)
router.route('/signup')
    .post(userController.signUp)
router.route('/logout')
    .get(userController.logOut)
router.route('/change-pwd')
    .post(passport.authenticate('jwt', { session: false }), userController.changePassword)
/* Authorization area */

/* Statistic area */
router.route('/session-user').get(userController.sessionUsers)
router.route('/online-user').get(userController.onlineUsers)
/* Statistic area */

router.route('/:userID')
    .get(passport.authenticate('jwt', { session: false }), userController.getUser)
    .put(passport.authenticate('jwt', { session: false }), userController.updateUser)
    .delete(passport.authenticate('jwt', { session: false }), userController.deleteUser)

module.exports = router