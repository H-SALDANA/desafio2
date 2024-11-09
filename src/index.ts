interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
}

interface Sale {
    idSales: number;
    idProduct: number;
    quantitySold: number;
    saleDate: string;
    idCustomer: number;
    // total: number;
}

interface Customer {
    idCustomer: number;
    name: string;
    email: string;
}

// pregunta 1: creamos 3 arrays:
const products: Product[] = [
    { id: 1, name: 'Manzanas', price: 1500, category: 'Frutas', stock: 20 },
    { id: 2, name: 'Pan', price: 1000, category: 'Panadería', stock: 50 },
    { id: 3, name: 'Leche', price: 800, category: 'Lácteos', stock: 40 },
    { id: 4, name: 'Jugo de Naranja', price: 2500, category: 'Bebidas', stock: 75 },
    { id: 5, name: 'Café', price: 3000, category: 'Bebidas', stock: 10 },
    { id: 6, name: 'Galletas', price: 1200, category: 'Snacks', stock: 90 },
    { id: 7, name: 'Agua Mineral', price: 500, category: 'Bebidas', stock: 120 },
    { id: 8, name: 'Queso', price: 2000, category: 'Lácteos', stock: 5 },
    { id: 9, name: 'Cereal', price: 2800, category: 'Desayunos', stock: 30 },
    { id: 10, name: 'Yogur', price: 1500, category: 'Lácteos', stock: 150 }
];

const sales: Sale[] = [
    { idSales: 1, idProduct: 1, quantitySold: 1000, saleDate: '2024-11-01', idCustomer: 1 },
    { idSales: 2, idProduct: 2, quantitySold: 3500, saleDate: '2024-11-02', idCustomer: 2 },
    { idSales: 3, idProduct: 3, quantitySold: 2000, saleDate: '2024-11-03', idCustomer: 3 },
    { idSales: 4, idProduct: 4, quantitySold: 700, saleDate: '2024-11-04', idCustomer: 4 },
    { idSales: 5, idProduct: 5, quantitySold: 1000, saleDate: '2024-11-05', idCustomer: 5 },
    { idSales: 6, idProduct: 6, quantitySold: 80, saleDate: '2024-11-06', idCustomer: 6 },
    { idSales: 7, idProduct: 7, quantitySold: 40, saleDate: '2024-11-07', idCustomer: 7 },
    { idSales: 8, idProduct: 8, quantitySold: 25, saleDate: '2024-11-08', idCustomer: 8 },
    { idSales: 9, idProduct: 9, quantitySold: 1000, saleDate: '2024-11-09', idCustomer: 9 },
    { idSales: 10, idProduct: 10, quantitySold: 50, saleDate: '2024-11-10', idCustomer: 10 }
];

const customers: Customer[] = [
    { idCustomer: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { idCustomer: 2, name: 'María Gómez', email: 'maria.gomez@example.com' },
    { idCustomer: 3, name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com' },
    { idCustomer: 4, name: 'Ana López', email: 'ana.lopez@example.com' },
    { idCustomer: 5, name: 'Luis Martínez', email: 'luis.martinez@example.com' },
    { idCustomer: 6, name: 'Pedro Torres', email: 'pedro.torres@example.com' },
    { idCustomer: 7, name: 'Lucía Romero', email: 'lucia.romero@example.com' },
    { idCustomer: 8, name: 'Gabriela Díaz', email: 'gabriela.diaz@example.com' },
    { idCustomer: 9, name: 'Ricardo Castillo', email: 'ricardo.castillo@example.com' },
    { idCustomer: 10, name: 'Sofía Herrera', email: 'sofia.herrera@example.com' }
];

// PREGUNTA 2:
// Creamos una función que agrupa los tres productos más vendidos.
function bestSellingProducts(products: Product[], sales: Sale[]) {
    return sales.map(sale => {
        const product = products.find(p => p.id === sale.idProduct);
        if (product) {
            return {
                nameProduct: product.name,
                idProduct: sale.idProduct,
                total: sale.quantitySold
            };
        }
        return { idProduct: sale.idProduct, total: 0 };
    }).sort((a, b) => b.total - a.total).slice(0, 3).
        map(product => ({ ...product, total: product.total.toLocaleString('de-DE', { minimumFractionDigits: 0 }) }));;
}
const totalProducts = bestSellingProducts(products, sales);
console.table(totalProducts);

// PREGUNTA 3:
// creamos una función que calcule la cantidad de productos vendidos por categoria:
function priceQuantitySold(products: Product[], sales: Sale[]) {
    return sales.map(sale => {
        const product = products.find(p => p.id === sale.idProduct);
        if (product) {
            return {
                category: product.category,
                idProduct: sale.idProduct,
                total: (product.price * sale.quantitySold).toLocaleString('de-DE', { minimumFractionDigits: 0 })
            };
        }
        return { idProduct: sale.idProduct, total: 0 };
    });
}
const totalSales = priceQuantitySold(products, sales);
console.table(totalSales);

// le damos formato de miles.
const totalSalesFormatted = totalSales.map(sale => ({
    ...sale, total: parseFloat(sale.total.toString().replace(/\./g, '')).toLocaleString('de-DE', { minimumFractionDigits: 0 })
}));

const sumaSales1 = totalSalesFormatted.map(({ total }) => {
    return parseFloat(total.toString().replace(/\./g, ''));
});
// hallamos la suma total de las ventas:
const sumSales = sumaSales1.reduce((acc, presentValue) => acc + presentValue, 0);
const resultadoFinal = { SumTotal: sumSales.toLocaleString('de-DE', { minimumFractionDigits: 0 }) }

console.table(resultadoFinal);

// PREGUNTA 4:
// creamos una función para identificar clientes VIP:
function clientsVip(products: Product[], sales: Sale[], customers: Customer[]) {
    return sales.map(sale => {
        const product = products.find(p => p.id === sale.idProduct);
        const customer = customers.find(c => c.idCustomer === sale.idCustomer);
        if (product && customer) {
            const total = product.price * sale.quantitySold;
            return {
                nameCustomerVip: customer.name,
                idProduct: sale.idProduct,
                total: total
            }
        }
        return { name: '', idProduct: sale.idProduct, total: 0 };
    }).filter(sale => sale.total > 1000000);
}
const totalSales3 = clientsVip(products, sales, customers).map(sale => ({
    ...sale,
    total: sale.total.toLocaleString('de-DE', { minimumFractionDigits: 0 })
}));
console.table(totalSales3);

// PREGUNTA 5:
// Creamos una función que genere un reporte de inventario:
function inventoryReport(products: Product[]) {
    return products.map(prod => {
        const totalStock: number = prod.stock;
        function conditions(totalStock: number) {
            if (totalStock < 10) return "low stock";
            if (totalStock >= 10 && totalStock <= 20) return "in stock";
            if (totalStock > 20) return "enough stock";
        }
        const messageStatus = conditions(totalStock);

        if (totalStock && messageStatus) {
            return {
                name: prod.name,
                category: prod.category,
                totalStock: totalStock,
                status: messageStatus
            }
        }
        return null;
    }).filter(prod => prod !== null);
}
const report = inventoryReport(products);
console.table(report);


