import express from 'express';
import contactRoute from './contact.route.js';
import faqRoute from './faq.route.js';
import programRoute from './program.route.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';

const router = express.Router();

console.log("🟦🟦🟦 ROUTES.TS MODULE LOADED 🟦🟦🟦");
console.log("Auth route imported:", authRoute);
console.log("Type of authRoute:", typeof authRoute);

const routes = [
    { path: '/users', router: userRoute },
    { path: '/contacts', router: contactRoute },
    { path: '/faqs', router: faqRoute },
    { path: '/programs', router: programRoute },
    { path: '/auth', router: authRoute },
];

routes.forEach(route => {
    console.log(`Registering route: ${route.path}`);
    router.use(route.path, route.router);
});

// Debug: Log all registered routes
router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log("Registered route:", r.route.path);
    } else if (r.name === 'router') {
        console.log("Mounted router at:", r.regexp);
    }
});

export default router;