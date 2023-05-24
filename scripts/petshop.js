const container = document.querySelector('.container')


class Productos {
    constructor(price, name, productImage, category, totalPrice, directions, brand) {
        this.price = price,
            this.name = name,
            this.productImage = productImage,
            this.category = category,
            this.totalPrice = totalPrice,
            this.directions = directions,
            this.brand = brand
    }
}

let allProducts = [];

let product1 = new Productos(18.78, "Purina Friskies Gravy Swirlers Adult Dry Cat Food", "../img/Friskies1.jpg", "food", 18.78, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "Purina");

let product2 = new Productos(19.29, "Temptations Classic Crunchy and Soft Cat Treats, 30 oz.", "../img/temptations2.jpg", "food", 19.29, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "9Lives");

let product3 = new Productos(42.55, "PACK OF 2 - Purina Kit & Kaboodle Original Cat Food 30 lb. Bag", "../img/kitkaboodle3.jpg", "food", 42.55, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "KitKaboodle");

let product4 = new Productos(14.99, "Castor & Pollux Pristine Grain Free Dry Dog Food with Raw Bites", "../img/pristine4.jpg", "food", 14.99, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "Castor")

let product5 = new Productos(29.99, "Purina Tidy Cats Clumping Cat Litter", "../img/todycats5.jpg", "food", 22.99, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "Pedigree")

let product6 = new Productos(9.99, "9Lives Plus Care Dry Cat Food, 13.3 Lb", "../img/9lives6.jpg", "food", 9.99, "Key BenefitsDeboned chicken, chicken meal and turkey meal supply the protein your dog needs Sweet potatoes, peas and potatoes provide healthy complex carbohydrates Blueberries, cranberries and carrots support antioxidant-enrichment", "9Lives")

let product7 = new Productos(32.43, "Merrick Backcountry Grain Free Real Meat Wet Cat Food, 3 oz. Pouches, Case of 24", "../img/backcountry7.jpg", "food", 32.43, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "Merrick")

let product8 = new Productos(53.78, "Blue Buffalo Wilderness High Protein Grain Free, Natural Adult Dry Cat Food, Chicken", "../img/buffalocat8.jpg", "food", 53.78, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "Blue Buffalo")

let product9 = new Productos(39.09, "Meow Mix Original Choice Dry Cat Food", "../img/meowmix.jpg", "food", 39.09, "Up to 15 lbs 1/2 to 1-1/4 cups*16 to 25 lbs 1-1/4 to 1-3/4 cups*26 to 40 lbs 1-3/4 to 2-1/4 cups*41 to 60 lbs 2-1/4 to 3-1/4 cups*61 to 80 lbs 3-1/4 to 4 cups*81 to 100 lbs 4 to 4-3/4 cups*Over 100 lbs 4-3/4 cups* + 1/2 cup for each additional 20 lbs", "Meowmix")

allProducts.push(product1, product2, product3, product4, product5, product6, product7, product8, product9)

function LoadProducts() {
    container.innerHTML = ""
    allProducts.forEach(product => {
        container.innerHTML += `<div class="card mb-3" style="max-width: 400px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.productImage}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.brand}</p>
              <p class="card-text">${product.price}</p>
              <p class="card-text"><small class="text-body-secondary">${product.directions}</small></p>
            </div>
          </div>
        </div>
      </div>`

    });
}

LoadProducts()


