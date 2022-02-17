# Text Output Plugin

This is a [Cider Music](https://github.com/ciderapp/Cider) plugin designed to output information about the currently playing song to a text file.

## Please note

This plugin was designed for Cider version 1.1.0 (commit a3a3675) and supports the non-Windows store version at this time. Cider does not officially support 3rd party plugins yet, so as new releases are made this plugin may break and need to be updated.

## Installation

To install the plugin -

1. Download the most recent version from the [GitHub Releases](https://github.com/ChaseIngebritson/text-output-plugin/releases) page

2. Locate the Cider folder within AppData. This can also be done by navigating to this URL when the application is open: [cider://debug/appdata](cider://debug/appdata)

3. Create a folder called `plugins` within the folder from step 2

4. Move the file you downloaded in step 1 to this folder

5. Launch Cider!

## Settings

The plugin comes with a few default settings that can be modified to adjust the output.

| Name | Description | Default |
| --- | --- | --------- |
| name | The name of the plugin. | "Text Output" |
| description | A description of the plugin. | "A plugin to output currently playing song information to a text file." |
| version | The current version of the plugin. | "1.0.0" |
| author | The author of the plugin. | "Chase Ingebritson" |
| fileName | The name of the file that the plugin will output to. | "textOutput.txt" |
| template | The format of the output. | "$$t - $$a [$$l]" |
| fields | The placeholders to replace using the attributes specified. | See below |

```javascript
[
  { key: 'name', placeholder: '$$t' },
  { key: 'artistName', placeholder: '$$a' },
  { key: 'albumName', placeholder: '$$l' },
  { key: 'composerName', placeholder: '$$c' }
]
```

More information regarding available attributes can be found on the [Apple MusicKit documentation](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song) page.

## Contributing

If you'd like to help, feel free to open a pull request.

### Dependency installation

```bash
npm install
```

### Building

```bash
npm run build
```
