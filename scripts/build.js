// Do this as the first thing so that any code reading it knows the right env.
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import filesize from 'filesize'
import gzipSize from 'gzip-size'
import rimraf from 'rimraf'
import webpack from 'webpack'
import config from '../config/webpack.config.prod.js'
import paths from '../config/paths.cjs'
import checkRequiredFiles from './utils/checkRequiredFiles.js'
import recursive from 'recursive-readdir'
import stripAnsi from 'strip-ansi'
import { formatMessage, isLikelyASyntaxError } from './utils/utils.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const appPackageJson = require(paths.appPackageJson)

process.env.NODE_ENV = 'production'

checkRequiredFiles()

// Input: /User/dan/app/build/static/js/main.82be8.js
// Output: /static/js/main.js
function removeFileNameHash (fileName) {
  return fileName
    .replace(paths.appBuild, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3)
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel (currentSize, previousSize) {
  const FIFTY_KILOBYTES = 1024 * 50
  const difference = currentSize - previousSize
  const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red('+' + fileSize)
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow('+' + fileSize)
  } else if (difference < 0) {
    return chalk.green(fileSize)
  } else {
    return ''
  }
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
recursive(paths.appBuild, (err, fileNames) => {
  if (err) {
    console.error('Error: ', err)
  }
  const previousSizeMap = (fileNames || [])
    .filter(fileName => /\.(js|css)$/.test(fileName))
    .reduce((memo, fileName) => {
      const contents = fs.readFileSync(fileName)
      const key = removeFileNameHash(fileName)
      memo[key] = gzipSize.sync(contents)
      return memo
    }, {})

  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  rimraf.sync(paths.appBuild + '/*')

  // Start the webpack build
  build(previousSizeMap)
})

// Print a detailed summary of build files.
function printFileSizes (stats, previousSizeMap) {
  const assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      const fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name)
      const size = gzipSize.sync(fileContents)
      const previousSize = previousSizeMap[removeFileNameHash(asset.name)]
      const difference = getDifferenceLabel(size, previousSize)
      return {
        folder: path.join('build', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size) + (difference ? ' (' + difference + ')' : ''),
      }
    })
  assets.sort((a, b) => b.size - a.size)
  const longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => stripAnsi(a.sizeLabel).length)
  )
  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel
    const sizeLength = stripAnsi(sizeLabel).length
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength)
      sizeLabel += rightPadding
    }
    console.log(
      '  ' + sizeLabel +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    )
  })
}

// Create the production build and print the deployment instructions.
function build (previousSizeMap) {
  console.log('Creating an optimized production build...')

  webpack(config).run((err, stats) => {
    if (err) {
      console.error('Failed to create a production build. Reason:')
      console.error(err.message || err)
      process.exit(1)
    }

    const hasErrors = stats.hasErrors()
    const hasWarnings = stats.hasWarnings()

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    // We use stats.toJson({}, true) to make output more compact and readable:
    // https://github.com/facebookincubator/create-react-app/issues/401#issuecomment-238291901

    if (!hasErrors && !hasWarnings) {
      console.log(chalk.green('Compiled successfully.'))
      console.log()

      console.log('File sizes after gzip:')
      console.log()
      printFileSizes(stats, previousSizeMap)
      console.log()

      const openCommand = process.platform === 'win32' ? 'start' : 'open'
      const homepagePath = appPackageJson.homepage
      const publicPath = config.output.publicPath
      if (homepagePath && homepagePath.indexOf('.github.io/') !== -1) {
        // "homepage": "http://user.github.io/project"
        console.log('The project was built assuming it is hosted at ' + chalk.green(publicPath) + '.')
        console.log('You can control this with the ' + chalk.green('homepage') + ' field in your ' + chalk.cyan('package.json') + '.')
        console.log()
        console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed.')
        console.log('To publish it at ' + chalk.green(homepagePath) + ', run:')
        console.log()
        console.log('  ' + chalk.cyan('git') + ' commit -am ' + chalk.yellow('"Save local changes"'))
        console.log('  ' + chalk.cyan('git') + ' checkout -B gh-pages')
        console.log('  ' + chalk.cyan('git') + ' add -f build')
        console.log('  ' + chalk.cyan('git') + ' commit -am ' + chalk.yellow('"Rebuild website"'))
        console.log('  ' + chalk.cyan('git') + ' filter-branch -f --prune-empty --subdirectory-filter build')
        console.log('  ' + chalk.cyan('git') + ' push -f origin gh-pages')
        console.log('  ' + chalk.cyan('git') + ' checkout -')
        console.log()
      } else if (publicPath !== '/') {
        // "homepage": "http://mywebsite.com/project"
        console.log('The project was built assuming it is hosted at ' + chalk.green(publicPath) + '.')
        console.log('You can control this with the ' + chalk.green('homepage') + ' field in your ' + chalk.cyan('package.json') + '.')
        console.log()
        console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed.')
        console.log()
      } else {
        // no homepage or "homepage": "http://mywebsite.com"
        console.log('The project was built assuming it is hosted at the server root.')
        if (homepagePath) {
          // "homepage": "http://mywebsite.com"
          console.log('You can control this with the ' + chalk.green('homepage') + ' field in your ' + chalk.cyan('package.json') + '.')
          console.log()
        } else {
          // no homepage
          console.log('To override this, specify the ' + chalk.green('homepage') + ' in your ' + chalk.cyan('package.json') + '.')
          console.log('For example, add this to build it for GitHub Pages:')
          console.log()
          console.log('  ' + chalk.green('"homepage"') + chalk.cyan(': ') + chalk.green('"http://myname.github.io/myapp"') + chalk.cyan(','))
          console.log()
        }
        console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed.')
        console.log('You may also serve it locally with a static server:')
        console.log()
        console.log('  ' + chalk.cyan('npm') + ' install -g pushstate-server')
        console.log('  ' + chalk.cyan('pushstate-server') + ' build')
        console.log('  ' + chalk.cyan(openCommand) + ' http://localhost:9000')
        console.log()
      }
      return
    }

    const json = stats.toJson({}, true)
    let formattedErrors = json.errors.map(message =>
      'Error in ' + formatMessage(message)
    )
    const formattedWarnings = json.warnings.map(message =>
      'Warning in ' + formatMessage(message)
    )
    // console.log(stats.hasErrors());
    // console.log(stats.toJson({}, true));

    if (hasErrors) {
      console.log(chalk.red('Failed to compile.'))
      console.log()
      if (formattedErrors.some(isLikelyASyntaxError)) {
        // If there are any syntax errors, show just them.
        // This prevents a confusing ESLint parsing error
        // preceding a much more useful Babel syntax error.
        formattedErrors = formattedErrors.filter(isLikelyASyntaxError)
      }
      formattedErrors.forEach(message => {
        console.log(message)
        console.log()
      })
      // If errors exist, ignore warnings.
      return
    }
    if (hasWarnings) {
      console.log(chalk.yellow('Compiled with warnings.'))
      console.log()
      formattedWarnings.forEach(message => {
        console.log(message)
        console.log()
      })
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.')
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.')
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.')
    }
  })
}
