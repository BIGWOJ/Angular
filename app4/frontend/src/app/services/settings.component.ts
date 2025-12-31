import { Component } from '@angular/core';
import { BackendStorage } from './backend-storage.service';

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
    constructor(private backendStorage: BackendStorage) {}
    saveSettings(): void {
        const settings = { theme: 'dark', language: 'en' };
        this.backendStorage.setItem(this.settingsKey, settings);
    }
    loadSettings(): void {
    this.backendStorage.getItem<{ theme: string; language: string }>(
        this.settingsKey
    );
    }
}
