const gulp = require('gulp');
const { dest, src, task, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const fs = require('fs');
const inline = require('gulp-inline');
const multiDest = require('gulp-multi-dest');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

task('config', () => {
    const defaultFile = 'config.example.js';
    const preferredFile = 'config.js';
    let useFile = defaultFile;

    if (fs.existsSync(preferredFile)) {
        useFile = preferredFile;
    }

    return src(useFile)
        .pipe(rename('config.js'))
        .pipe(multiDest(['public/', 'dist/']));
});

task('css', () => {
    return src([
        'src/sass/app.scss',
        'src/components/**/*.scss',
        ])
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['./node_modules/materialize-css/sass']
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(postcss([cssnano()]))
        .pipe(sourcemaps.write('../maps'))
        .pipe(dest('public/css/'));
});

task('js', () => {
    return src('src/js/app.js')
        .pipe(webpackStream({
            devtool: 'source-map',
            output: {
                path: __dirname + '/public/',
                publicPath: 'js/',
                filename: '[name].js',
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            },
                        }],
                    },
                    {
                        test: /\.riot$/,
                        use: [{
                            loader: '@riotjs/webpack-loader',
                            options: {
                                hot: false,
                            },
                        }],
                    },
                ],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'src/index.html',
                    filename: '../index.html',
                }),
                new HtmlWebpackPlugin({
                    template: 'src/index.html',
                    filename: '../index-standalone.html',
                    inlineSource: '.(js|css)$',
                }),
                new HtmlWebpackInlineSourcePlugin(),
            ],
        }))
        .pipe(dest('public/js/'));
});

task('dist', () => {
    return src('public/index-standalone.html')
        .pipe(inline({
            ignore: ['config.js'],
        }))
        .pipe(rename('index.html'))
        .pipe(dest('dist/'));
});

task('dev', series( 'css', 'config', 'js', 'dist'));

task('watch', () => {
    watch(['src/**', 'config.*'], gulp.series('dev'));
});
