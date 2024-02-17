type Politeness = 'off' | 'polite' | 'assertive';
interface AriaLiveAnnouncerProps {
    politeness?: Politeness;
    processingTime?: number;
}
export declare class AriaLiveAnnouncer {
    #private;
    constructor({ politeness, processingTime }: AriaLiveAnnouncerProps);
    init({ politeness, processingTime }: AriaLiveAnnouncerProps): void;
    announce(message: string, politeness?: Politeness): void;
    destroy(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map