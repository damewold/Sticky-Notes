const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the songs from the database
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "tasksTable" ORDER BY "id";`;
    pool.query(sqlText)
    .then((response) => {
    console.log('Got rows of tasks from server', response.rows)
        res.send(response.rows);
    }).catch((error) => {
        console.log('Error on GET:', error);
        res.sendStatus(500);
    });
});



// // Setup a POST route to add a new song to the database
router.post('/', (req, res) => {
    const taskItem = req.body;
    console.log(req.body)
    const sqlText = `INSERT INTO "tasksTable" ("status","task","dueDate") VALUES($1, $2,$3);`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool.query(sqlText, [taskItem.status, taskItem.task, taskItem.dueDate])
        .then((result) => {
            console.log(`Added new task to the weekend-to-do-app database`, taskItem);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

// // Setup DELETE to remove a song from the database
// // We are using a request parameter (req.params) to identify
// // the song we want to delete. We expect this will be an id 
// // from the database
// router.delete('/:id', (req, res) => {
//     let reqId = req.params.id;
//     console.log('Delete request for id', reqId);
//     let sqlText = 'DELETE FROM songs WHERE id=$1;';
//     pool.query(sqlText, [reqId])
//         .then((result) => {
//             console.log('Song deleted');
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log(`Error making database query ${sqlText}`, error);
//             res.sendStatus(500); // Good server always responds
//         })
// })

// // Change rank on my song - body will say up or down
// router.put('/rank/:id', (req, res) => {
//     let songId = req.params.id;
//     // Direction will come from the client and say up or down
//     let direction = req.body.direction;
//     let sqlText = '';

//     if (direction === 'up') {
//         // use rank-1, so it get's closer to the awesome rank of 1
//         sqlText = `UPDATE songs SET rank=rank-1 WHERE id=$1`;
//     } else if (direction == 'down') {
//         sqlText = `UPDATE songs SET rank=rank+1 WHERE id=$1`;
//     } else {
//         // If we don't get an expected direction, send back bad status
//         res.sendStatus(500);
//         return; // Do it now, don't run code below
//     }

//     pool.query(sqlText, [songId])
//         .then((result) => {
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log(`Error making database query ${sqlText}`, error);
//             res.sendStatus(500);
//         })
// })


module.exports = router;