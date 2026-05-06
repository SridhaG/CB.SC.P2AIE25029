export class NotificationHeap {
  constructor(maxSize = 10) {
    this.heap = [];
    this.maxSize = maxSize;
    this.weights = {
      'Placement': 3,
      'Result': 2,
      'Event': 1
    };
  }

  getPriority(notification) {
    const weight = this.weights[notification.Type] || 0;
    const time = new Date(notification.Timestamp).getTime();
    return { weight, time };
  }

  compare(a, b) {
    const pA = this.getPriority(a);
    const pB = this.getPriority(b);
    if (pA.weight !== pB.weight) {
      return pA.weight - pB.weight; 
    }
    return pA.time - pB.time; 
  }

  insert(notification) {
    if (this.heap.length < this.maxSize) {
      this.heap.push(notification);
      this.bubbleUp(this.heap.length - 1);
    } else {
      if (this.compare(notification, this.heap[0]) > 0) {
        this.heap[0] = notification;
        this.sinkDown(0);
      }
    }
  }

  bubbleUp(index) {
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIdx]) >= 0) break;
      [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
      index = parentIdx;
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let smallest = index;

      if (leftChildIdx < length && this.compare(this.heap[leftChildIdx], this.heap[smallest]) < 0) {
        smallest = leftChildIdx;
      }
      if (rightChildIdx < length && this.compare(this.heap[rightChildIdx], this.heap[smallest]) < 0) {
        smallest = rightChildIdx;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  getTop() {
    return [...this.heap].sort((a, b) => this.compare(b, a));
  }
}
