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
var _a, _AriaLiveAnnouncer_instantiated, _AriaLiveAnnouncer_rootElement, _AriaLiveAnnouncer_politeness;
const UNIQUE_ID = '__aria-announcer-element__';
export class AriaLiveAnnouncer {
    constructor(politeness = 'polite') {
        _AriaLiveAnnouncer_rootElement.set(this, void 0);
        _AriaLiveAnnouncer_politeness.set(this, void 0);
        this.init(politeness);
    }
    // Init method to allow consecutive `destroy` and `init`.
    init(politeness = 'polite') {
        if (!__classPrivateFieldGet(_a, _a, "f", _AriaLiveAnnouncer_instantiated)) {
            __classPrivateFieldSet(_a, _a, true, "f", _AriaLiveAnnouncer_instantiated);
            __classPrivateFieldSet(this, _AriaLiveAnnouncer_politeness, politeness, "f");
            __classPrivateFieldSet(this, _AriaLiveAnnouncer_rootElement, document.createElement('div'), "f");
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").id = UNIQUE_ID;
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', politeness);
            document.body.appendChild(__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f"));
        }
    }
    announce(message, politeness = __classPrivateFieldGet(this, _AriaLiveAnnouncer_politeness, "f")) {
        if (!__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f")) {
            console.warn('AriaLiveAnnouncer not initialized, please use init() method');
            return;
        }
        // temporary change the politeness setting
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', politeness);
        __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").innerText = message;
        // cleanup the message and reset the politeness setting
        setTimeout(() => {
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").innerText = null;
            __classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f").setAttribute('aria-live', __classPrivateFieldGet(this, _AriaLiveAnnouncer_politeness, "f"));
        }, 1);
    }
    // Cleanup method that will remove the element and reset the singleton
    destroy() {
        document.body.removeChild(__classPrivateFieldGet(this, _AriaLiveAnnouncer_rootElement, "f"));
        __classPrivateFieldSet(this, _AriaLiveAnnouncer_rootElement, undefined, "f");
        __classPrivateFieldSet(_a, _a, false, "f", _AriaLiveAnnouncer_instantiated);
    }
}
_a = AriaLiveAnnouncer, _AriaLiveAnnouncer_rootElement = new WeakMap(), _AriaLiveAnnouncer_politeness = new WeakMap();
_AriaLiveAnnouncer_instantiated = { value: false };
//# sourceMappingURL=index.js.map