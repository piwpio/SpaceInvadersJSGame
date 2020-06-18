import { Topic } from "./topic";

export class Mediator {
  topics: Function[] = [];

  private publish(topic: string) {
    if (this.topics[topic] !== undefined) {
     this.topics.forEach(cb => {
       cb();
     });
    }
  }

  private subscribe(topic: string, callback: Function) {
    if (this.topics[topic] === undefined) {
      this.topics[topic].push(callback);
    }
  }

  public bindTo(topic: Topic) {
    topic.mediatorSubscribe = this.subscribe;
    topic.mediatorPublish = this.publish;
  }
}
