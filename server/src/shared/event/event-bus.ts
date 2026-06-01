import { EventEmitter } from "node:events";
import { Types } from "mongoose";

export interface DomainEvents {
  "auth.registered": {
    userId: Types.ObjectId;
    firstName: string;
    email: string;
    emailVerifyToken: string | undefined;
  };
  "auth.loggedIn": {
    userId: Types.ObjectId;
    email: string;
    location: string;
    device: string;
    browser: string;
    userAgent: string;
    createdAt: Date;
  };
  "auth.passwordChanged": {
    userId: Types.ObjectId;
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

class TypedEventBus extends EventEmitter {
  emit<K extends DomainEventName>(event: K, payload: DomainEvents[K]): boolean {
    return super.emit(event, payload);
  }

  on<K extends DomainEventName>(
    event: K,
    listener: (payload: DomainEvents[K]) => void,
  ): this {
    return super.on(event, listener);
  }

  once<K extends DomainEventName>(
    event: K,
    listener: (payload: DomainEvents[K]) => void,
  ): this {
    return super.once(event, listener);
  }

  off<K extends DomainEventName>(
    event: K,
    listener: (payload: DomainEvents[K]) => void,
  ): this {
    return super.off(event, listener);
  }
}

const eventBus = new TypedEventBus();

eventBus.setMaxListeners(20);

export default eventBus;
