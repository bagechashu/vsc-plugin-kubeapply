import * as vscode from "vscode";
import { runResourceCommand } from "./kubeapply"

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "kubeApply" is now active!');

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

export function deactivate() { }
