import express from 'express';

const router: express.Router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    res.send( "Hello world!" );
});

export default router;
