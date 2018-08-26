'use strict';

import * as vscode from 'vscode';
import { I18nHoverProvider } from './i18nHoverProvider';
import { I18nResolver } from './i18nResolver';
import { I18nCompletionProvider } from './i18nCompletionProvider';

export let i18nResolver = new I18nResolver();

export function activate(context: vscode.ExtensionContext) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: "Loading translations.."
    }, () => i18nResolver.load());

    context.subscriptions.push(i18nResolver);

    const documentFilters = [
        { language: 'haml', scheme: 'file' },
        { language: 'erb', scheme: 'file' },
        { language: 'slim', scheme: 'file' }
    ];

    context.subscriptions.push(vscode.languages.registerHoverProvider(documentFilters, new I18nHoverProvider()));

    const triggerCharacters = ".abcdefghijklmnopqrstuvwxyz".split("");
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(documentFilters, new I18nCompletionProvider(), ...triggerCharacters));
}
