// Import the 'vscode' module with alias vscode, containing the VS Code extensibility API.
import * as vscode from 'vscode';

// This method is called when your extension is activated. Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "semantic-line-breaks" is now active!');

	// The command has been defined in the package.json file. Implement the command with registerCommand. The commandId parameter must match the command field in package.json
	let addSemanticLineBreaks = vscode.commands.registerCommand('semantic-line-breaks.current-file', async () => {
		
		// Get the active text editor
		const activeEditor = vscode.window.activeTextEditor;

		// Display an error message if no editor is active
		if (!activeEditor) {
            console.error('No active editor found!');
            vscode.window.showErrorMessage('No document is open');
            return;
        }

		// Set supported filetypes
		const supportedTypes = ['markdown', 'mdx'];

		// Check and store filetype of file open in active editor
        const fileType = activeEditor.document.languageId;

		// Display an error message if the chosen filetype isn't supported
        if (!supportedTypes.includes(fileType)) {
            console.error('File type not supported');
            vscode.window.showErrorMessage('This file type is not supported by the extension');
            return;
        }

		// Get the entire contents of the text file
        const text = activeEditor.document.getText();

		// Create a variable and define it with the new version of the text file
        const newText = text.replace(/(\. )/g, '.\n');  	// Replace '. ' with '.\n' globally in the text

		const entireRange = new vscode.Range(
            activeEditor.document.positionAt(0),
            activeEditor.document.positionAt(text.length)
        );
		
		// Parse the file for strings matching '. '

		// Insert single line breaks after all matching strings.
		
		// Display a message box to the user, and log to console
		vscode.window.showInformationMessage('⛏️ Added `n` semantic line breaks to `filename`');
		console.log('Success message box displayed!');
	});

	let testError = vscode.commands.registerCommand('semantic-line-breaks.error', () => {
		vscode.window.showInformationMessage('❌ Error. Is this a supported file?');
		console.log('Success message box displayed!');
	});

	context.subscriptions.push(addSemanticLineBreaks);
	context.subscriptions.push(testError);
}

// This method is called when your extension is deactivated
export function deactivate() {}
