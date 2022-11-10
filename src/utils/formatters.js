export const dateFormatter = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};

export const currencyFormatter = (price) => {
    const nf = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 2,
        roundingIncrement: 5,
    });

    return nf.format(price);
};