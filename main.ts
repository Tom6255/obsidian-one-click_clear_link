import { App, Editor, MarkdownView, Notice, Plugin } from 'obsidian';

export default class RemoveBracketsPlugin extends Plugin {
	async onload() {
		console.log('Loading Remove Brackets plugin...');

		// Add the ribbon icon
		const ribbonIconEl = this.addRibbonIcon('x', 'Remove Brackets', () => {
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				const editor = activeView.editor;
				const originalText = editor.getValue();
				const newText = originalText.replace(/\[\[.*?\]\]/g, '');
				editor.setValue(newText);
				new Notice('Brackets and content removed!');
			} else {
				new Notice('No active Markdown file!');
			}
		});

		// Add the command (optional, for command palette access)
		this.addCommand({
			id: 'remove-brackets-command', // Different ID than the ribbon icon
			name: 'Remove Brackets and Content (Command)',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const originalText = editor.getValue();
				const newText = originalText.replace(/\[\[.*?\]\]/g, '');
				editor.setValue(newText);
				new Notice('Brackets and content removed!');
			},
		});


	}

	onunload() {
		console.log('Unloading Remove Brackets plugin.');
	}
}
