/*
 * This module will be imported by ava to mock browser globals in tests cases
 * */

import browserEnv from 'browser-env'
browserEnv(['window', 'document'])
