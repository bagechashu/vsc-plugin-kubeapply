import * as vscode from "vscode";

export function getResourcePath(
    uri: vscode.Uri | undefined
) {
    if (uri === undefined && vscode.window.activeTextEditor === undefined) {
        return;
    }

    let resourcePath = "";
    if (uri !== undefined) {
        resourcePath = uri.fsPath;
    } else if (vscode.window.activeTextEditor !== undefined) {
        resourcePath = vscode.window.activeTextEditor.document.uri.fsPath;
    }
    console.log(resourcePath);
    return resourcePath;
}

export function ensureTerminalExists(): boolean {
    if ((<any>vscode.window).terminals.length === 0) {
        vscode.window.showErrorMessage("No active terminals. Press [ctrl] + [shift] + [`] to open one");
        return false;
    }
    return true;
}

export function selectTerminal(): vscode.Terminal {
    return <vscode.Terminal>(<any>vscode.window.activeTerminal);
}
