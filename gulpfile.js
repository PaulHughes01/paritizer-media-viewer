const gulp = require('gulp');
const { dest, src, task, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const fs = require('fs');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

task('config', () => {
    const defaultFile = 'config.example.js';
    const preferredFile = 'config.js';
    let useFile = defaultFile;

    if (fs.existsSync(preferredFile)) {
        useFile = preferredFile;
    }

    return src(useFile)
        .pipe(rename('config.js'))
        .pipe(dest('public/js/'));
});

task('css', () => {
    return src([
        'src/sass/app.scss',
        'src/components/**/*.tag.scss',
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
            ],
        }))
        .pipe(dest('public/js/'));
});

task('dev', series( 'css', 'js', 'config'));

task('watch', () => {
    watch(['src/**', 'config.*'], gulp.series('dev'));
});
