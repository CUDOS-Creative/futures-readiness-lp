const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const sassglob = require('gulp-sass-glob')
const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
const fs = require('fs')
const browserSync = require('browser-sync').create()

let imagemin

const paths = {
	styles: {
		src: './scss/style.scss',
		dest: '../assets/css/',
		watch: './scss/**/*.scss',
	},
	scripts: {
		src: './js/**/*.js',
		dest: '../assets/js/',
	},
	images: {
		src: './images/**/*',
		dest: '../assets/images/',
	},
	clean: '../assets/',
	twig: '../views/**/*.twig', // Adjust this if you're working with other HTML files
}

// Clean assets directory
async function cleanTask() {
	await fs.promises.rm(paths.clean, { recursive: true, force: true })
}

// Compile SCSS to CSS
function devStyles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sourcemaps.init()) // Initialize sourcemaps
		.pipe(sassglob())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			postcss([
				tailwindcss('./tailwind.config.js'),
				autoprefixer(),
				cssnano(),
			]),
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./')) // Write sourcemaps to the same directory as the CSS file
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream()) // Inject CSS changes into the browser
}

function prodStyles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sassglob())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			postcss([
				tailwindcss('./tailwind.config.js'),
				autoprefixer(),
				cssnano(),
			]),
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream()) // Inject CSS changes into the browser
}

// Bundle JavaScript using Webpack
function scripts() {
	return gulp
		.src(paths.scripts.src)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream()) // Inject JS changes into the browser
}

// Optimize images
async function images() {
	if (!imagemin) {
		imagemin = (await import('gulp-imagemin')).default
	}
	return gulp
		.src(paths.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest))
		.pipe(browserSync.stream()) // Inject image changes into the browser
}

// Serve and watch files
function serve() {
	browserSync.init({
		proxy: 'http://localhost/futures-readiness-lp/', // Adjust this if your local server runs on a different port or domain
		open: true, // Set to true to automatically open the browser
		notify: false, // Set to true to show notifications in the browser
	})

	gulp.watch(paths.styles.watch, devStyles)
	gulp.watch(paths.scripts.src, scripts)
	gulp.watch(paths.images.src, images)
	gulp.watch(paths.twig).on('change', function () {
		gulp.series(devStyles)() // Rebuild CSS when Twig files change
		browserSync.reload() // Reload browser when Twig files change
	})
}

const build = gulp.series(cleanTask, gulp.parallel(prodStyles, scripts, images))

// Default task
exports.default = gulp.series(
	cleanTask,
	gulp.parallel(devStyles, scripts, images),
	serve,
)

exports.build = build
