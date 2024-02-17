type Politeness = 'off' | 'polite' | 'assertive' 

const UNIQUE_ID = '__aria-announcer-element__';

export class AriaLiveAnnouncer {
    static #instantiated = false;
    
    #rootElement;
    #politeness;

    constructor(politeness: Politeness = 'polite') {
        this.init(politeness);
    }

    // Init method to allow consecutive `destroy` and `init`.
    init(politeness: Politeness = 'polite') {
        if (!AriaLiveAnnouncer.#instantiated) {
            AriaLiveAnnouncer.#instantiated = true;

            this.#politeness = politeness;

            this.#rootElement = document.createElement('div');
            this.#rootElement.id = UNIQUE_ID;
            this.#rootElement.style.width = '0';
            this.#rootElement.style.height = '0';
            this.#rootElement.style.opacity = '0';
            this.#rootElement.style.position= 'absolute';
            this.#rootElement.setAttribute('aria-live', politeness);

            document.body.appendChild(this.#rootElement);
        }
    }

    announce(message: string, politeness: Politeness = this.#politeness) {
        if (!this.#rootElement) {
            console.warn('AriaLiveAnnouncer not initialized, please use init() method');
            return;
        }

        // temporary change the politeness setting
        this.#rootElement.setAttribute('aria-live', politeness);
        this.#rootElement.innerText = message;

        // cleanup the message and reset the politeness setting
        setTimeout(() => {
            this.#rootElement.innerText = null;
            this.#rootElement.setAttribute('aria-live', this.#politeness);
        }, 1)
    }

    // Cleanup method that will remove the element and reset the singleton
    destroy() {
        document.body.removeChild(this.#rootElement);
        this.#rootElement = undefined;
        AriaLiveAnnouncer.#instantiated = false;
    }
}