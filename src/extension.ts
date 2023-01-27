import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "kubeApply" is now active!');

  function runResourceCommand(
    wait: boolean,
    command: string,
    args: string,
    uri: vscode.Uri | undefined
  ) {
    if (uri === undefined && vscode.window.activeTextEditor === undefined) {
      return;
    }

    let resourcePath = "";
    if (uri !== undefined) {
      resourcePath = uri.fsPath;
    } else if (vscode.window.activeTextEditor !== undefined) {
      const currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.fileName;
      resourcePath = path.basename(currentlyOpenTabfilePath);
    }

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

  let disposableApply = vscode.commands.registerCommand(
    "kubeApply.apply",
    (uri: vscode.Uri) => {
      runResourceCommand(true, "apply", "-f", uri);
    }
  );

  let disposableDiff = vscode.commands.registerCommand(
    "kubeApply.diff",
    (uri: vscode.Uri) => {
      runResourceCommand(false, "diff", "-f", uri);
    }
  );

  let disposableDelete = vscode.commands.registerCommand(
    "kubeApply.delete",
    (uri: vscode.Uri) => {
      runResourceCommand(true, "delete", "-f", uri);
    }
  );

  let disposableApplyNoWait = vscode.commands.registerCommand(
    "kubeApply.apply-noWait",
    (uri: vscode.Uri) => {
      runResourceCommand(false, "apply", "-f", uri);
    }
  );

  let disposableApplyKustomize = vscode.commands.registerCommand(
    "kubeApply.apply-kustomize",
    (uri: vscode.Uri) => {
      runResourceCommand(true, "apply", "-k", uri);
    }
  );

  let disposableDiffKustomize = vscode.commands.registerCommand(
    "kubeApply.diff-kustomize",
    (uri: vscode.Uri) => {
      runResourceCommand(false, "diff", "-k", uri);
    }
  );

  context.subscriptions.push(disposableApply);
  context.subscriptions.push(disposableDiff);
  context.subscriptions.push(disposableDelete);
  context.subscriptions.push(disposableApplyNoWait);
  context.subscriptions.push(disposableApplyKustomize);
  context.subscriptions.push(disposableDiffKustomize);
}

export function deactivate() {}

function ensureTerminalExists(): boolean {
  if ((<any>vscode.window).terminals.length === 0) {
    vscode.window.showErrorMessage("No active terminals");
    return false;
  }
  return true;
}

function selectTerminal(): vscode.Terminal {
  return <vscode.Terminal>(<any>vscode.window.activeTerminal);
}
