import {App, SuggestModal} from "obsidian";
import type SearchPlugin from "./main";
import {focus} from "./utils";

export class SearchModal extends SuggestModal<string>{
	plugin: SearchPlugin

	constructor(app: App, plugin: SearchPlugin) {
		super(app);
		this.plugin = plugin;
		this.setPlaceholder('Please enter the query...')
	}

	onOpen() {
		focus();
	}

	getSuggestions(query: string): string[] {
		return [`Search Google for: ${query}`];
	}

	onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent): void {
		let url = 'https://www.google.com/search?&q=' + item;
		url = encodeURI(url)
		window.open(url)
	}


	renderSuggestion(value: string, el: HTMLElement): void {
		const el0 = el.createDiv();
		const el1 = el0.createEl('b', {
			cls: ['search-plugin', 'search-engine'],
		});
		el1.appendText(value)
	}
}
