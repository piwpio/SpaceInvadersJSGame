import { Topic } from "./topic";
import { MediatorTopics } from "../models";

export class Mediator {
  static topics: MediatorTopics = {};

  static publish(topic: string) {
    if (Mediator.topics[topic] !== undefined) {
      Mediator.topics[topic].forEach(el => {
       el.callback.call(el.context);
     });
    }
  }

  static subscribe(topic: string, callback: Function) {
    if (Mediator.topics[topic] === undefined) {
      Mediator.topics[topic] = [];
    }
    Mediator.topics[topic].push({context: this, callback: callback});
  }

  public bindTo(topic: Topic) {
    topic.mediatorSubscribe = Mediator.subscribe;
    topic.mediatorPublish = Mediator.publish;
  }
}
