class DashboardPage{
    constructor(page){
        this.page = page;
        this.path = '/inventory.html'
        this.inventoryList = page.getByTestId('inventory-list');
    }
}

module.exports = {DashboardPage}