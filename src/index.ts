type Politeness = 'off' | 'polite' | 'assertive' 

const UNIQUE_ID = '__aria-announcer-element__';
const DEFAULT_PROCESSING_TIME = 500;
const DEFAULT_POLITENESS = 'polite';

interface AriaLiveAnnouncerProps {
    politeness?: Politeness;
    processingTime?: number;
}

export class AriaLiveAnnouncer {
    static #instantiated = false;
    static __DEBUG__ = false;

    #rootElement;
    #politeness;
    #announcementQueue = [];
    #isAnnouncing = false;
    #processingTime = DEFAULT_PROCESSING_TIME;

    constructor({ politeness, processingTime }: AriaLiveAnnouncerProps = { politeness: DEFAULT_POLITENESS, processingTime: DEFAULT_PROCESSING_TIME }) {
        this.init({ politeness, processingTime });
    }

    // Init method to allow consecutive `destroy` and `init`.
    init({ politeness, processingTime }: AriaLiveAnnouncerProps = { politeness: DEFAULT_POLITENESS, processingTime: DEFAULT_PROCESSING_TIME}) {
        if (AriaLiveAnnouncer.#instantiated) {
            AriaLiveAnnouncer.__DEBUG__ && console.warn('AriaLiveAnnouncer is already instantiated');
            return;
        }

        AriaLiveAnnouncer.#instantiated = true;

        this.#politeness = politeness;
        this.#processingTime = processingTime;

        this.#rootElement = document.createElement('div');
        this.#rootElement.id = UNIQUE_ID;
        this.#rootElement.style.width = '0';
        this.#rootElement.style.height = '0';
        this.#rootElement.style.opacity = '0';
        this.#rootElement.style.position= 'absolute';
        this.#rootElement.setAttribute('aria-live', politeness);

        document.body.appendChild(this.#rootElement);
    }

    // method that will post a message to the screen reader
    announce(message: string, politeness: Politeness = this.#politeness) {
        if (!this.#rootElement) {
            AriaLiveAnnouncer.__DEBUG__ && console.warn('AriaLiveAnnouncer not initialized, please use init() method');
            return;
        }

        this.#announcementQueue.push({ message, politeness });

        if (!this.#isAnnouncing) {
            this.#processQueue();
        }
    }

    // Cleanup method that will remove the element and reset the singleton
    destroy() {
        const remaining = this.#announcementQueue.length;

        if (remaining > 0) {
            AriaLiveAnnouncer.__DEBUG__ && console.warn(`Destroying AriaLiveAnnouncer with ${remaining} items left to announce. Announcing them all at once`);

            this.#rootElement.setAttribute('aria-live', this.#politeness);
            this.#rootElement.innerText = this.#announcementQueue.map(v => v.message).join('\n');
            this.#clearQueue();
            
            setTimeout(() => this.#cleanup(), this.#processingTime);
        } else {
            this.#cleanup();
        }
    }

    #clearQueue() {
        this.#announcementQueue = [];
        this.#isAnnouncing = false;
    }
    
    // Private cleanup method that removes the element and resets the announcement queue & singleton
    #cleanup() {
        document.body.removeChild(this.#rootElement);
        this.#rootElement = undefined;
        this.#clearQueue();

        AriaLiveAnnouncer.#instantiated = false;
    }

    // Recursive method to process the announced messages one at a time based on the processing time provided by the consumer or using the default
    #processQueue() {
        if (this.#announcementQueue.length > 0) {
            this.#isAnnouncing = true;

            const { message, politeness } = this.#announcementQueue.shift();

            this.#rootElement.setAttribute('aria-live', politeness);
            this.#rootElement.innerText = message;

            setTimeout(() => {
                if (!this.#rootElement) { 
                    return;
                }
                
                this.#rootElement.innerText = '';
                this.#rootElement.setAttribute('aria-live', this.#politeness);

                this.#processQueue();
            }, this.#processingTime);
        } else {
            this.#isAnnouncing = false;
        }
    }
}