const express = require('express')
const Busboy = require('busboy')

const app = express()
app.use(express.json())


app.post('/upload', (req, res) => {
    const contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        return res.status(400).send('Incorrect content type')
    }

    const busboy = new Busboy({ headers: req.headers })
    const arguments = {

    }

    busboy.on('file', function (fieldName, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename);
        const writeStream = new stream.Writeable()
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    })

    busboy.on('field', function(fieldname, val) {
        console.log('Field [' + fieldname + ']: value: ' + val);
        arguments[fieldname] = val
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });

    req.pipe(busboy)
})

app.get('/status', (req, res) => {
    res.send('running')
})


app.use('/', (req, res) => {
    res.status(404).json({
        error: 'route not found'
    })
})

app.listen(5000, () => {
    console.log('listening')
})