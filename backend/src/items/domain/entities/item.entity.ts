export class Item {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly price: number,
        public readonly currency: string,
        public readonly images: string[],
        public readonly condition: 'new' | 'used',
        public readonly stock: number,
        public readonly seller: Seller,
        public readonly paymentMethods: PaymentMethod[],
        public readonly shipping: Shipping,
        public readonly rating?: number,
        public readonly reviewsCount?: number,
        public readonly reviews: Review[] = [],
    ) {}

    get formattedPrice(): string {
        return `${this.currency} ${this.price.toLocaleString()}`;
    }

    get isAvailable(): boolean {
        return this.stock > 0;
    }
}

export class Review {
    constructor(
        public readonly id: number,
        public readonly rating: number,
        public readonly date: string,
        public readonly review: string,
        public readonly likes: number,
    ) {}
}

export class Seller {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly reputation: number,
        public readonly location: string,
    ) {}
}

export class PaymentMethod {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly type: 'credit_card' | 'debit_card' | 'cash' | 'bank_transfer',
    ) {}
}

export class Shipping {
    constructor(
        public readonly free: boolean,
        public readonly cost: number,
        public readonly estimatedDays: number,
    ) {}
}