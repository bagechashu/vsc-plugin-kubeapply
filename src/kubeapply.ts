import * as vscode from "vscode";
import { getResourcePath, ensureTerminalExists, selectTerminal } from "./utils";

export function runResourceCommand(
    wait: boolean,
    command: string,
    args: string,
    uri: vscode.Uri | undefined
) {
    const resourcePath = getResourcePath(uri)

    if (!ensureTerminalExists()) {
        return;
    }

    let sp: string = ` && `;
    let infoEcho: string = `echo -e "\n \\033[42m[ ${command.toUpperCase()} ]`;
    let warnEcho: string = `echo -e "\n \\033[41m[ ${command.toUpperCase()} ]`;
    let endEcho: string = `\\033[0m will execute after 5s, \\033[;36;4m[Ctrl+c]\\033[0m to cancel"`;
    let wait5Min: string = `for i in $(seq 5); do  echo "." && sleep 1 ; done`;
    let kubeApplyCmd: string = `kubectl ${command} ${args} ${resourcePath}`;

    const terminal = selectTerminal();
    if (!wait) {
        terminal.sendText(kubeApplyCmd);
    } else if (command === "delete") {
        terminal.sendText(
            `${warnEcho}${endEcho} ${sp} ${wait5Min} ${sp} ${kubeApplyCmd}`
        );
    } else {
        terminal.sendText(
            `${infoEcho}${endEcho} ${sp} ${wait5Min} ${sp} ${kubeApplyCmd}`
        );
    }
}