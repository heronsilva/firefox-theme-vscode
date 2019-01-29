const fs = require('fs')

const chokidar = require('chokidar')
const jsonMinify = require('jsonminify')
const yaml = require('js-yaml')

const shouldWatchForChanges = process.argv.includes('--watch')


if (shouldWatchForChanges) {
    chokidar
        .watch('src/dark.yaml')
        .on('change', generateThemeFile)
}

generateThemeFile()

function generateThemeFile(curr, prev) {
    const theme = fs.readFileSync('src/dark.yaml', 'utf8')
    const themeYaml = yaml.load(theme)
    const themeJson = JSON.stringify(themeYaml, null, 4)

    fs.writeFile('themes/dark.json', jsonMinify(themeJson), err => {
        if (err) {
            throw err
        }

        return console.log('theme generated!')
    })
}
