// Product structure or blueprint
// The constructor() method is a special method for creating and initializing objects created within a class.
// The constructor() method is called automatically when a class is initiated
class Product {
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Product;
