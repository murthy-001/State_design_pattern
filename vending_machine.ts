// State interface defining methods that concrete states should implement
interface VendingMachineState {
  insertMoney(money: number): void;
  selectProduct(productId: number): void;
  dispenseProduct(): void;
}

// Concrete state for when no money has been inserted
class NoMoneyState implements VendingMachineState {
  constructor(private vendingMachine: VendingMachine) {}

  // Insert money and change state to money inserted
  insertMoney(money: number): void {
    console.log(`You inserted $${money}.`);
    this.vendingMachine.money += money;
    this.vendingMachine.setState(this.vendingMachine.moneyInsertedState);
  }

  // Cannot select a product without money
  selectProduct(productId: number): void {
    console.log(`Please insert money first.`);
  }

  // Cannot dispense product without money
  dispenseProduct(): void {
    console.log(`Please insert money first.`);
  }
}

// Concrete state for when money has been inserted
class MoneyInsertedState implements VendingMachineState {
  constructor(private vendingMachine: VendingMachine) {}

  // Insert more money and stay in the same state
  insertMoney(money: number): void {
    console.log(`You inserted $${money}.`);
    this.vendingMachine.money += money;
  }

  // Select a product and change state to product selected
  selectProduct(productId: number): void {
    const product = this.vendingMachine.products[productId];
    if (product && product.price <= this.vendingMachine.money) {
      console.log(`You selected ${product.name}.`);
      this.vendingMachine.selectedProduct = product;
      this.vendingMachine.setState(this.vendingMachine.productSelectedState);
    } else {
      console.log(`Please select a valid product or insert more money.`);
    }
  }

  // Cannot dispense product without selecting one first
  dispenseProduct(): void {
    console.log(`Please select a product first.`);
  }
}

// Concrete state for when a product has been selected
class ProductSelectedState implements VendingMachineState {
  constructor(private vendingMachine: VendingMachine) {}

  // Insert more money and stay in the same state
  insertMoney(money: number): void {
    console.log(`You inserted $${money}.`);
    this.vendingMachine.money += money;
  }

  // Cannot select another product while one is already selected
  selectProduct(productId: number): void {
    console.log(`You have already selected a product.`);
  }

  // Dispense the selected product and change state to no money
  dispenseProduct(): void {
    console.log(`Dispensing ${this.vendingMachine.selectedProduct.name}.`);
    this.vendingMachine.money -= this.vendingMachine.selectedProduct.price;
    this.vendingMachine.selectedProduct = null;
    this.vendingMachine.setState(this.vendingMachine.noMoneyState);
  }
}

// Vending machine class that acts as the context object
class VendingMachine {
  // States that the vending machine can be in
  public noMoneyState: VendingMachineState;
  public moneyInsertedState: VendingMachineState;
  public productSelectedState: VendingMachineState;

  // Current state of the vending machine
  private state: VendingMachineState;

  // Products available in the vending machine
  public products: { [id: number]: { name: string; price: number } } = {
    1: { name: 'Coke', price: 1.5 },
    2: { name: 'Water', price: 1 },
    3: { name: 'Ch
