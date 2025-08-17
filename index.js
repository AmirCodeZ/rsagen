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


if (type === 'privateKey') {
    const { privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: Number(bite),
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })
    outro(`This Your RSA Key:\n ${chalk.green(privateKey)}`)
} else {
    const { publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: Number(bite),
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        }
    })
    
    outro(`This Your RSA Key:\n ${chalk.green(publicKey)}`)
}



outro(`${chalk.white(" rsagen ")}Made By AmirCodeZ`)