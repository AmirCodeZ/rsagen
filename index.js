#!/usr/bin/env node

import { text, outro, intro, select } from '@clack/prompts'
import crypto from 'node:crypto'
import fs from 'node:fs'
import chalk from 'chalk'
import path from 'node:path'


intro(`Wellcome to ${chalk.white(" rsagen ")}`)
const bite = await text({
    message: 'How many bite do you have? (Defult value is 1024)',
    placeholder: 'Default size is 1024',
    defaultValue: 1024
})

const type = await select({
    message: "Which type you want your rsa to be?",
    options: [
        {
            label: 'PrivateKey',
            hint: 'privatekey',
            value: 'privateKey',
        },
        {
            label: 'PublicKey',
            hint: 'publickey',
            value: 'publicKey',
        }
    ]
})

const fileName = await text({
    message: "Enter your FileName.",
    placeholder: "Default filename is rsagen",
    defaultValue: 'rsagen'
})
let URL = await text({
    message: 'Where is your path to write rsa?',
    placeholder : `Default URL is ./${fileName}`, 
    defaultValue: `./${fileName}.key`
})
if (fs.existsSync(URL) && fs.lstatSync(URL).isDirectory()) {
    URL = path.join(URL, `${fileName}.key`)
}
const dirName = path.dirname(URL)
fs.mkdirSync(dirName, { recursive: true })

if (type === 'privateKey') {
    const { privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: Number(bite),
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })
    fs.writeFileSync(URL, privateKey)
} else {
    const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: Number(bite),
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        }
    })
    fs.writeFileSync(URL, publicKey)
}



outro(`rsa key write in ${chalk.green(fileName)} successfully.`)
outro(`${chalk.white(" rsagen ")}Made By AmirCodeZ`)