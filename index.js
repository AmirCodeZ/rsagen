#!/usr/bin/env node

import { text, outro, intro, select } from '@clack/prompts'
import crypto from 'node:crypto'
import chalk from 'chalk'
import { writeToClipboard } from './util/clipboard.js'

intro(`Welcome to ${chalk.white(" rsagen ")}`)
async function main() {
    const byte = await text({
        message: 'How many byte do you have? (Default value is 1024)',
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
    
    if (type === 'privateKey') {
        const { privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: Number(byte),
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })
        await writeToClipboard(privateKey)
        console.log(`\nYOUR KEY: \n${chalk.green(privateKey)}`)
    } else {
        const { publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: Number(byte),
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            }
        })
        await writeToClipboard(publicKey)
        console.log(`\nYOUR KEY: \n${chalk.green(publicKey)}`)
    }
    
    outro('✨ Copied to clipboard.')
    outro(`${chalk.white(" rsagen ")}Made By AmirCodeZ`)
}

main()