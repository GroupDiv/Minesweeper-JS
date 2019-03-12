//require.js
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'http://code.jquery.com/jquery-1.11.2.min'
    }
});
//load minesweeper file
requirejs(['scripts/minesweeper']);