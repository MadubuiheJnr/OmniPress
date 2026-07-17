import { EventEmitter } from "node:events";
import { Types } from "mongoose";
class TypedEventBus extends EventEmitter {
    emit(event, payload) {
        return super.emit(event, payload);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    off(event, listener) {
        return super.off(event, listener);
    }
}
const eventBus = new TypedEventBus();
eventBus.setMaxListeners(20);
export default eventBus;
//# sourceMappingURL=event-bus.js.map