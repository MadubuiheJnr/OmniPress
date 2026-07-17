import { EventEmitter } from "node:events";
import { Types } from "mongoose";
export interface DomainEvents {
    "auth.registered": {
        authId: Types.ObjectId;
        firstName: string;
        email: string;
        emailVerifyToken: string | undefined;
    };
    "auth.loggedIn": {
        authId: Types.ObjectId;
        email: string;
        location: string;
        device: string;
        browser: string;
        userAgent: string;
        createdAt: Date;
    };
    "auth.passwordChanged": {
        authId: Types.ObjectId;
        email: string;
    };
    "article.published": {
        articleId: Types.ObjectId;
        authorId: Types.ObjectId;
        title: string;
    };
    "article.liked": {
        articleId: Types.ObjectId;
        userId: Types.ObjectId;
    };
    "user.followed": {
        followerId: Types.ObjectId;
        followedId: Types.ObjectId;
    };
}
export type DomainEventName = keyof DomainEvents;
declare class TypedEventBus extends EventEmitter {
    emit<K extends DomainEventName>(event: K, payload: DomainEvents[K]): boolean;
    on<K extends DomainEventName>(event: K, listener: (payload: DomainEvents[K]) => void): this;
    once<K extends DomainEventName>(event: K, listener: (payload: DomainEvents[K]) => void): this;
    off<K extends DomainEventName>(event: K, listener: (payload: DomainEvents[K]) => void): this;
}
declare const eventBus: TypedEventBus;
export default eventBus;
//# sourceMappingURL=event-bus.d.ts.map