// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "whatsapp-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('whatsapp-code.sendCode', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No Active Text Editor Found!');
			return;
		}
		
		vscode.window.showInputBox({ placeHolder: 'Enter the WhatsApp Number with country code' })
			.then((res) => {
				let code = editor.document.getText(editor.selection)
				const fileName = `*Code Snippet from ` + editor.document.fileName + `*%0D%0A%0D%0A`;
				let data = fileName.concat(code.replace('https://api.whatsapp.com/send?phone=', 'WhatsAppSendAPI%3D'));
				data = data.replace('&text=', 'TEXT%3D');
				data = data.concat('%0D%0A%0D%0A_Sent via *WhatsApp Code* extension on VS Code_');
				let re = /\#/gi;
				data = data.replace(re, '%23')
				// vscode.window.showInformationMessage(data);
				vscode.env.openExternal(vscode.Uri.parse(`https://api.whatsapp.com/send?phone=${res}&text=${data}`))
			})
			.then(() => {
				vscode.window.showInformationMessage(`Click 'Open' to send Code via WhatsApp.`);
			});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
