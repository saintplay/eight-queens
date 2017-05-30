module.exports = {
    entry: './src/typescript/Main.ts',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist/js/'
    },
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: 'source-map',
};