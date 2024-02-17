var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _AriaLiveAnnouncer_instances, _a, _AriaLiveAnnouncer_instantiated, _AriaLiveAnnouncer_rootElement, _AriaLiveAnnouncer_politeness, _AriaLiveAnnouncer_announcementQueue, _AriaLiveAnnouncer_isAnnouncing, _AriaLiveAnnouncer_processingTime, _AriaLiveAnnouncer_cleanup, _AriaLiveAnnouncer_processQueue;
const UNIQUE_ID = '__aria-announcer-element__';
const DEFAULT_PROCESSING_TIME = 500;
const DEFAULT_POLITENESS = 'polite';
export class AriaLiveAnnouncer {
    constructor({ politeness, processingTime } = { politeness: DEFAULT_POLITENESS, processingTime: DEFAULT_PROCESSING_TIME }) {
        _AriaLiveAnnouncer_instances.add(this);
        _AriaLiveAnnouncer_rootElement.set(this, void 0);
        _AriaLiveAnnouncer_politeness.set(this, void 0);
        _AriaLiveAnnouncer_announcementQueue.set(this, []);
        _AriaLiveAnnouncer_isAnnouncing.set(this, false);
        _AriaLiveAnnouncer_processingTime.set(this, DEFAULT_PROCESSING_TIME);
        this.init({ politeness, processingTime });
    }
    // Init method to allow consecutive `destroy` and `init`.
    init({ politeness, processingTime } = { politeness: DEFAULT_POLITENESS, processingTime: DEFAULT_PROCESSING_TIME }) {
        if (__classPrivateFieldGet(_a, _a, "f", _AriaLiveAnnouncer_instantiated)) {
            console.warn('AriaLiveAnnouncer is already instantiated');
            return;
        }
        __classPrivateFieldSet(_a, _a, true, "f", _AriaLiveAnnouncer_instantiated);
        __classPrivateFieldSet(this, _AriaLiveAnnouncer_politeness, politeness, "f");
        __classPrivateFieldSet(this, _AriaLiveAnnouncer_processingTime, processingTime, "f");
        __classPrivateFieldSet(this, _AriaLiveAnnouncer_rootElement, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").id = UNIQUE_ID;
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").style.width = '0';
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").style.height = '0';
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").style.opacity = '0';
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").style.position = 'absolute';
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', politeness);
        document.body.appendChild(__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f"));
    }
    // method that will post a message to the screen reader
    announce(message, politeness = __classPrivateFieldGet(this, _AriaLiveAnnouncer_politeness, "f")) {
        if (!__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f")) {
            console.warn('AriaLiveAnnouncer not initialized, please use init() method');
            return;
        }
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_announcementQueue, "f").push({ message, politeness });
        if (!__classPrivateFieldGet(this, _AriaLiveAnnouncer_isAnnouncing, "f")) {
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_instances, "m", _AriaLiveAnnouncer_processQueue).call(this);
        }
    }
    // Cleanup method that will remove the element and reset the singleton
    destroy() {
        const remaining = __classPrivateFieldGet(this, _AriaLiveAnnouncer_announcementQueue, "f").length;
        if (remaining > 0) {
            console.warn(`Destroying AriaLiveAnnouncer with ${remaining} items left to announce. Announcing them all at once`);
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', __classPrivateFieldGet(this, _AriaLiveAnnouncer_politeness, "f"));
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").innerText = __classPrivateFieldGet(this, _AriaLiveAnnouncer_announcementQueue, "f").map(v => v.message).join('\n');
            __classPrivateFieldSet(this, _AriaLiveAnnouncer_announcementQueue, [], "f");
            setTimeout(() => __classPrivateFieldGet(this, _AriaLiveAnnouncer_instances, "m", _AriaLiveAnnouncer_cleanup).call(this), __classPrivateFieldGet(this, _AriaLiveAnnouncer_processingTime, "f"));
        }
        else {
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_instances, "m", _AriaLiveAnnouncer_cleanup).call(this);
        }
    }
}
_a = AriaLiveAnnouncer, _AriaLiveAnnouncer_rootElement = new WeakMap(), _AriaLiveAnnouncer_politeness = new WeakMap(), _AriaLiveAnnouncer_announcementQueue = new WeakMap(), _AriaLiveAnnouncer_isAnnouncing = new WeakMap(), _AriaLiveAnnouncer_processingTime = new WeakMap(), _AriaLiveAnnouncer_instances = new WeakSet(), _AriaLiveAnnouncer_cleanup = function _AriaLiveAnnouncer_cleanup() {
    document.body.removeChild(__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f"));
    __classPrivateFieldSet(this, _AriaLiveAnnouncer_rootElement, undefined, "f");
    __classPrivateFieldSet(this, _AriaLiveAnnouncer_announcementQueue, [], "f");
    __classPrivateFieldSet(_a, _a, false, "f", _AriaLiveAnnouncer_instantiated);
}, _AriaLiveAnnouncer_processQueue = function _AriaLiveAnnouncer_processQueue() {
    if (__classPrivateFieldGet(this, _AriaLiveAnnouncer_announcementQueue, "f").length > 0) {
        __classPrivateFieldSet(this, _AriaLiveAnnouncer_isAnnouncing, true, "f");
        const { message, politeness } = __classPrivateFieldGet(this, _AriaLiveAnnouncer_announcementQueue, "f").shift();
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', politeness);
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").innerText = message;
        setTimeout(() => {
            if (!__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f")) {
                return;
            }
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").innerText = '';
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', __classPrivateFieldGet(this, _AriaLiveAnnouncer_politeness, "f"));
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_instances, "m", _AriaLiveAnnouncer_processQueue).call(this);
        }, __classPrivateFieldGet(this, _AriaLiveAnnouncer_processingTime, "f"));
    }
    else {
        __classPrivateFieldSet(this, _AriaLiveAnnouncer_isAnnouncing, false, "f");
    }
};
_AriaLiveAnnouncer_instantiated = { value: false };
//# sourceMappingURL=index.js.map