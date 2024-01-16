class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }
    //스택에 요소 추가
    push(item: T): void {
        this.items.push(item);
    }
    //가장 나중에 입력된 요소 반환 및 제거
    pop(): T | undefined {
        return this.items.pop();
    }
    //최상위 요소 확인
    peek(): T | undefined {
        return this.items[this.items.length -1];
    }
    //비어있는지 확인
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    //스택의 요소 개수 반환
    size(): number {
        return this.items.length;
    }
    clear(): void {
        this.items.length = 0;
    }
    //배열로 변환하여 전달
    toArray(): T[] {
        return this.items.slice();
    }
}

export default Stack;