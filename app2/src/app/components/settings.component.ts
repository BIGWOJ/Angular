import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
    selector: 'app-settings',
    template: `
    <h1>Settings</h1>
    <button (click)="saveSettings()">Save Settings</button>
    <button (click)="loadSettings()">Load Settings</button>
    `,
    })
export class SettingsComponent {
    private settingsKey = 'user-settings';
    constructor(private localStorageService: LocalStorageService) {}
    saveSettings(): void {
        const settings = { theme: 'dark', language: 'en' };
        this.localStorageService.setItem(this.settingsKey, settings);
        console.log('Settings saved.');
    }
    loadSettings(): void {
    const settings = this.localStorageService.getItem<{ theme: string; language: string }>(
        this.settingsKey
    );
    console.log('Loaded settings:', settings);
    }
}