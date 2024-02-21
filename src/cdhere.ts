import * as vscode from "vscode";
import { getResourcePath, ensureTerminalExists, selectTerminal } from "./utils";

// cd to selected directory in terminal.
export async function runCdCommand(
    uri: vscode.Uri | undefined
) {
    const resourcePath = getResourcePath(uri);

    if (!ensureTerminalExists()) {
        return;
    }

    let cdCmd: string = `cd ${resourcePath}`;

    const terminal = selectTerminal();

    terminal.sendText(`${cdCmd}`);
}
