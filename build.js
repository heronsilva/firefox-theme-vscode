const yaml = require('js-yaml')
const jsonMinify = require('jsonminify')
const fs = require('fs')

buildTheme()

fs.watch('./src', buildTheme)

function buildTheme(curr, prev) {
    const theme = fs.readFileSync('./src/dark.yaml', 'utf8')
    const themeYaml = yaml.load(theme)
    const themeJson = JSON.stringify(themeYaml, null, 4)

    fs.writeFile('./themes/dark.json', jsonMinify(themeJson), err => {
        if (err) {
            throw err
        }

        console.log('Theme saved!')
    })
}
