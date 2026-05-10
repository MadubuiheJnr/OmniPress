import { EventEmitter } from "node:events";

export interface DomainEvents {
  "auth.registered": {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  "auth.passwordChanged": {
    userId: string;
    email: string;
  };
  "article.published": {
    articleId: string;
    authorId: string;
    title: string;
  };
  "article.liked": {
    articleId: string;
    userId: string;
  };
  "user.followed": {
    followerId: string;
    followedId: string;
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
