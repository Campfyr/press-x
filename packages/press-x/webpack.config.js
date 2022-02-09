const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.[m?j|t]s$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            }
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'press-x.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            name: "react-change",
            type: "umd"
        },
    }
}