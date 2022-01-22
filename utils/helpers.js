import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);

export function getDateRange(period) {
    let startDate = null;
    let endDate = null;

    if (period !== 'all') {
        let periodUnit = 'month';
        if (period === '7') {
            periodUnit = 'week';
        } else if (period === '90') {
            periodUnit = 'quarter';
        } else if (period === '365') {
            periodUnit = 'year';
        }
        // @ts-ignore
        startDate = dayjs().startOf(periodUnit);
        // @ts-ignore
        endDate = dayjs().endOf(periodUnit);
    }

    return { startDate, endDate };
}
