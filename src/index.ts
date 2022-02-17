import * as electron from 'electron';
import * as fs from 'fs';
import { resolve } from 'path';

export default class TextOutputPlugin {
    /**
     * Base Plugin Details (Eventually implemented into a GUI in settings)
     */
    public name: string = 'Text Output';
    public description: string = 'A plugin to output song information to a text file.';
    public version: string = '0.0.1';
    public author: string = 'Chase Ingebritson';
    public fileName: string = 'textOutput.txt'
    public template: string = `$$t - $$a [$$l]`
    public fields = [
        { key: 'name', placeholder: '$$t' },
        { key: 'artistName', placeholder: '$$a' },
        { key: 'albumName', placeholder: '$$l' },
        { key: 'composerName', placeholder: '$$c' }
    ]
         
    /**
     * Private variables for interaction in plugins
     */
    private _win: any;
    private _app: any;
    private _store: any;
    private _pluginPath = resolve(electron.app.getPath('userData'), `./plugins/text-output`);

    /**
     * Runs on plugin load (Currently run on application start)
     */
    constructor(app: any, store: any) {
        this._app = app;
        this._store = store
        console.debug(`[Plugin][${this.name}] Loading Complete.`)
    }

    /**
     * Runs on app ready
     */
    async onReady(win: any): Promise<void> {
        this._win = win;
        
        await this.assureOutputFileExists()
        console.debug(`[Plugin][${this.name}] Ready.`)
    }

    /**
     * Runs on app stop
     */
    onBeforeQuit(): void {
        console.log(`[Plugin][${this.name}] Stopped`)
    }

    /**
     * Runs on playback State Change
     * @param attributes Music Attributes (attributes.status = current state)
     */
    onPlaybackStateDidChange(attributes: object): void {
        const updatedTemplate = this.populateTemplate(attributes)
        this.updateOutputFile(updatedTemplate)
    }

    /**
     * Runs on song change
     * @param attributes Music Attributes
     */
    onNowPlayingItemDidChange(attributes: object): void {
        const updatedTemplate = this.populateTemplate(attributes)
        this.updateOutputFile(updatedTemplate)
    }

    /**
     * Create the output file, or just open it if it already exists
     * @private
     */
    private async assureOutputFileExists(): Promise<void> {
        try {
            await fs.promises.mkdir(this._pluginPath, { recursive: true })
            await fs.promises.open(`${this._pluginPath}/${this.fileName}`, 'w')
        } catch (err) {
            console.error(`[Plugin][${this.name}]`, err)
        }
    }

    /**
     * Populate the template with the song and artist
     * @private
     */
    private populateTemplate(attributes: any): string {
        let output = this.template

        this.fields.forEach(field => {
            if (attributes[field.key]) {
                output = output.replaceAll(field.placeholder, attributes[field.key])
            }
        })

        return output
    }

    /**
     * Create and update the file
     * @param input The contents to write to the file
     * @private
     */
    private async updateOutputFile(input: string): Promise<void> {
        await fs.promises.writeFile(`${this._pluginPath}/${this.fileName}`, input)
            .catch(err => console.error(`[Plugin][${this.name}]`, err))
    }
}