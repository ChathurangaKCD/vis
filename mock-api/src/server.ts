import app from './app';

/** Start Express server. */
const server = app.listen(app.get('port'), () => {
    console.log(
        '>>\tMock API is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('>>\tPress CTRL-C to stop\n');
});

export default server;
