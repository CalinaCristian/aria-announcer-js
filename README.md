# Aria Announcer JS

Aria Announcer JS is a vanilla JavaScript utility designed to enhance web application accessibility by announcing messages to screen readers using ARIA live regions. This simple yet powerful class supports dynamic content changes, ensuring your web applications are accessible to users relying on assistive technologies.

## Features

- **Lightweight and Easy to Use:** A straightforward API to make announcements to screen readers.
- **Customizable Politeness Levels:** Supports `off`, `polite`, and `assertive` ARIA live region settings.
- **Customizable processing time:** Supports a customizable time for the processing of each queued announcement
- **Singleton Pattern:** Manages announcements through a single live region in the DOM to avoid clutter and confusion.

## Installation

Install `aria-announcer-js` via npm:

```bash
npm install aria-announcer-js
```

This package is also compatible with modern module bundlers and build tools.

## Usage

### Basic Usage

After installation, you can import `AriaLiveAnnouncer` into your project and use it to announce messages:

```javascript
import { AriaLiveAnnouncer } from 'aria-announcer-js';

// defaults are 'polite' and '500' 
const announcer = new AriaLiveAnnouncer({ politeness: 'polite', processingTime: 500 });

// Announce a message
announcer.announce("Hello, world!");
```

### Example

Refer to the `example.html` file in the GitHub repository for a complete example on how to use `AriaLiveAnnouncer` in a web application. This example demonstrates triggering announcements on button click.

## API Reference

### `AriaLiveAnnouncer`

- **`announce(message: string, politeness?: 'off' | 'polite' | 'assertive')`**: Announces a message with an optional politeness level.
- **`init({ politeness, processingTime }: {politeness?: 'off' | 'polite' | 'assertive', processingTime?: number})`**: Initializes the announcer. Automatically called on creation but can be used to reinitialize after `destroy`.
- **`destroy()`**: Cleans up by removing the announcer's DOM element, allowing for a new instance to be created. It also announces remaining queued items if any separated by new lines.

## Development

Clone the repository to contribute or test locally:

```bash
git clone git@github.com:CalinaCristian/aria-announcer-js.git
cd aria-announcer-js
npm install
npm run build
```

### Scripts

- build: Compiles the TypeScript source code.
- build:watch: Watches for changes and recompiles.
- start: Creates a server for testing the `index.html`.
- release: Prepares a new version release using `standard-version`.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for any bugs, feature requests, or suggestions you may have.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/CalinaCristian/aria-announcer-js/blob/main/LICENSE) file for details.

## Links

- **NPM Package**: [aria-announcer-js](https://www.npmjs.com/package/aria-announcer-js)
- **GitHub Repository**: [https://github.com/CalinaCristian/aria-announcer-js](https://github.com/CalinaCristian/aria-announcer-js)
- **Issue Tracker**: [https://github.com/CalinaCristian/aria-announcer-js/issues](https://github.com/CalinaCristian/aria-announcer-js/issues)
