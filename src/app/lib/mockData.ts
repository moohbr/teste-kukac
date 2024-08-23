export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export type Transactions = {
    id: string;
    title: string;
    type: TransactionType;
    date: string;
    amount: number;
    userId: string;
};


const type: TransactionType[] = [TransactionType.INCOME, TransactionType.EXPENSE];

export const transactions: Transactions[] = [
    {
        id: crypto.randomUUID(),
        title: "Arroz",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Maçã",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Café",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Cerveja",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Leite",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Pão de queijo",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Pão de batata",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Goiabada",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Torresmo",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
    {
        id: crypto.randomUUID(),
        title: "Feijão tropeiro",
        type: type[Math.floor(Math.random() * type.length)],
        amount: Math.round(Math.random() * 100),
        date: new Date(
            Math.random() * (new Date("2021-12-31").getTime() - new Date("2020-01-01").getTime()) +
            new Date("2020-01-01").getTime()
        ).toISOString(),
        userId: '1',
    },
];

interface IMonthBalance {
    title: string,
    canvasID: string,
    totalNumber: number,
    percentage: number,
    year: number,
}

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const aggregated = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!acc[monthKey]) {
        acc[monthKey] = {
            totalNumber: 0,
            transactions: []
        };
    }

    if (TransactionType.EXPENSE) {
        acc[monthKey].totalNumber -= transaction.amount;
    } else {
        acc[monthKey].totalNumber += transaction.amount;
    }
    acc[monthKey].transactions.push(transaction);

    return acc;
}, {} as Record<string, { totalNumber: number; transactions: typeof transactions }>);


function calculatePercentage(totalNumber: number, prevMonthTotal: number) {
    if (prevMonthTotal === 0) {
        return totalNumber === 0 ? 0 : (totalNumber > 0 ? Infinity : -Infinity);
    }

    const percentage = ((totalNumber - prevMonthTotal) / prevMonthTotal) * 100;
    return Number(percentage.toFixed(2));
}

const monthBalance: IMonthBalance[] = Object.entries(aggregated).map(([key, { totalNumber }]) => {
    const [year, month] = key.split('-').map(Number);
    const prevMonthKey = `${year}-${month === 0 ? 11 : month - 1}`;
    const prevMonthTotal = aggregated[prevMonthKey]?.totalNumber || 0;

    const percentage = calculatePercentage(totalNumber, prevMonthTotal);
    return {
        title: `${months[month]} - ${year}`,
        canvasID: crypto.randomUUID(),
        totalNumber,
        percentage: percentage,
        year,
    };
});


monthBalance.sort((a, b) => {
    if (a.year !== b.year) {
        return a.year - b.year;
    }

    return months.indexOf(a.title.split(' - ')[0]) - months.indexOf(b.title.split(' - ')[0]);
});

export { monthBalance };