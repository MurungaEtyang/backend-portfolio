import {Router} from "express";
import addNavigationItems from "./nav-controller/addNavigationItems.js";
import deleteNavItem from "./nav-controller/deleteNavItem.js";
import disableNavItem from "./nav-controller/disableNavItem.js";
import enableNavItem from "./nav-controller/enableNavItem.js";
import getAllNavItems from "./nav-controller/getAllNavItems.js";
import getEnabledNavItems from "./nav-controller/getEnabledNavItems.js";
import activateDisabledNavAllItems from "./nav-controller/activateDisabledNavAllItems.js";
import activateSpecificNav from "./nav-controller/activateSpecificNav.js";
import uploadLogo from "./logo/uploadLogo.js";
import changeLogo from "./logo/changeLogo.js";
import deleteLogo from "./logo/deleteLogo.js";
import viewLogo from "./logo/viewLogo.js";
import updateNavbarColor from "./nav-controller/color/updateNavbarColor.js";
import retrieveNavbarColor from "./nav-controller/color/retrieveNavbarColor.js";
import changeBodySetting from "./body/changeBodySetting.js";
import getBodySetting from "./body/getBodySetting.js";
// import allPages from "./pages/allPages.js";

const router = Router()

// router.use('/pages/', allPages);
router.use('/body-setting/', changeBodySetting);
router.use('/body-setting/', getBodySetting);
router.use('/navbar-setting/', updateNavbarColor);
router.use('/navbar-setting/', retrieveNavbarColor);
router.use('/kenf-logo/', uploadLogo);
router.use('/kenf-logo/', changeLogo);
router.use('/kenf-logo/', deleteLogo);
router.use('/kenf-logo/', viewLogo);
router.use('/nav/', addNavigationItems);
router.use('/nav/', deleteNavItem);
router.use('/nav/', disableNavItem);
router.use('/nav/', enableNavItem);
router.use('/nav/', getAllNavItems);
router.use('/nav/', getEnabledNavItems);
router.use('/nav/', activateDisabledNavAllItems);
router.use('/nav/', activateSpecificNav);

export default  router;