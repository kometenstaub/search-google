import { App, Plugin } from 'obsidian';
import { SearchModal } from './suggester';
//import type { SearchSettings } from './interfaces';
//import SearchSettingTab from './settings';

//const DEFAULT_SETTINGS: SearchSettings = {};

export default class SearchPlugin extends Plugin {
	//@ts-ignore
	//settings: SearchSettings;

	async onload() {
		console.log('loading Search plugin');

		//await this.loadSettings();

		this.addCommand({
			id: 'query-google',
			name: 'Query Google',
			callback: () => {
				return new SearchModal(this.app, this).open();
			},
		});

		//this.addSettingTab(new SearchSettingTab(this.app, this));
	}

	onunload() {
		console.log('unloading Search plugin');
	}

	//async loadSettings() {
	//	this.settings = Object.assign(
	//		{},
	//		DEFAULT_SETTINGS,
	//		await this.loadData()
	//	);
	//}

	//async saveSettings() {
	//	await this.saveData(this.settings);
	//}
}
