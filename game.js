const DB = require('./DB');

const game = {
    start(req, res, next) {
        DB.status = 1
        res.status(201).send(DB.board)
    },
    createUser(req, res, next) {
        if (DB.users.length === 2)
            res.status(405).send('In this game there are two players already')
        //TODO check weather shape is already taken
        DB.users[req.params.userId] = {"name": req.body.name, "shape": req.body.shape}
        res.status(200).send(DB.users)
    },
    placeShape(req, res, next) {
        const shape = DB.users[req.params.userId].shape
        let position = req.body.position
        if (DB.board[position.x][position.y])
            res.status(405).send('')
        DB.board[position.x][position.y] = shape === 'o' ? 1 : -1
        DB.status = win()
        res.status(200).send(DB.status)
    },
    status(req, res, next) {
        switch (DB.status) {
            case '0':
                res.status(200).send(`The game hasn't started yet.`)
                break;
            case '1':
                res.status(200).send(`The game is running....`)
                break;
            case 'o':
                res.status(200).send(`The winner is O`)
                break;
            case 'x':
                res.status(200).send(`The winner is X`)
                break;
        }
    }
}

function win() {
    for (let i = 0; i < 3; i++) {
        let rowSum = 0;
        for (let j = 0; j < 3; j++) {
            rowSum += DB.board[i][j];
        }
        if (rowSum === 3)
            return 'o';
        else if (rowSum === -3)
            return 'x'
    }

    for (let i = 0; i < 3; i++) {
        let colSum = 0;
        for (let j = 0; j < 3; j++) {
            colSum += DB.board[j][i];
        }
        if (colSum === 3)
            return 'o'
        else if (colSum === -3)
            return 'x'
    }

    if (DB.board[0][0] + DB.board[1][1] + DB.board[2][2] === 3)
        return 'o'
    else if (DB.board[0][0] + DB.board[1][1] + DB.board[2][2] === -3)
        return 'x'

    if (DB.board[2][0] + DB.board[1][1] + DB.board[0][2] === 3)
        return 'o'
    else if (DB.board[2][0] + DB.board[1][1] + DB.board[0][2] === -3)
        return 'x'
}


module.exports = game;
