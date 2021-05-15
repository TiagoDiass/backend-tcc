import express from 'express';
const app = express();
app.get('/', (req, res) => res.json({ ok: 'hello world' }));
app.listen(3333);
