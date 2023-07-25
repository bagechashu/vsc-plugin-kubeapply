# Kubernetes Apply

## Features

A simple and slim extention to operate yaml files via `kubectl`.
- right click and select the command to operate yaml or directory. 
- The prompt before `Apply` and `Delete` is implemented through `echo`. 

| Command | comment | keybindings |
| :--- | :---: | :---: |
| `K8S: Apply` | `sleep 5 && kubectl apply -f [yaml]` |  |
| `K8S: Delete` | `sleep 5 && kubectl delete -f [yaml]` |  |
| `K8S: Diff` | `kubectl diff -f [yaml]` | `shift+alt+d / shift+cmd+d` |
| `K8S: Apply NoWait` | `kubectl apply -f [yaml\|DIR]` |  |
| `K8S: Apply kustomize` | `sleep 5 && kubectl apply -k [yaml\|DIR]` |  |
| `K8S: Apply kustomize` | `sleep 5 && kubectl diff -k [yaml\|DIR]` |  |

## Requirements

- a configured `kubectl`
- an active terminal in VSCode

## Special Thanks List
- [shaimendel](https://github.com/shaimendel/vscode-plugin-cicd-github-actions)
