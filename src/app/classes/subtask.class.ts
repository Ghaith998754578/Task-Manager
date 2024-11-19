interface SubtaskData {
  title: string;
  complete: boolean;
}

export class Subtask {
  title: string;
  complete: boolean;

  constructor(data?: SubtaskData) {
    this.title = data?.title || '';
    this.complete = data?.complete || false;
  }

  asJson() {
    return {
      title: this.title,
      complete: this.complete,
    };
  }
}
