export const PACKAGE_LIST_CHART_WIDTH = 500;
export const PACKAGE_LIST_CHART_MARGIN = 5;
export const PACKAGE_LIST_CHART_AXIS_PADDING = 25;

export function getLastMonths(monthCount: number, referenceDate = new Date()) {
    return Array.from({ length: monthCount }, (_, index) => {
        const date = new Date(
            referenceDate.getFullYear(),
            referenceDate.getMonth() - monthCount + 1 + index,
            1,
        );
        const month = String(date.getMonth() + 1).padStart(2, "0");

        return {
            key: `${date.getFullYear()}-${month}`,
            label: `${date.getFullYear()}-${month}`,
        };
    });
}

export function getChartTickMonths<T>(months: T[], tickCount = 6) {
    return getChartTickIndexes(months.length, tickCount).map((index) => months[index]);
}

export function getChartTickIndexes(monthCount: number, tickCount = 6) {
    const visibleTickCount = Math.min(monthCount, tickCount);

    if (visibleTickCount <= 1) {
        return monthCount === 0 ? [] : [0];
    }

    return Array.from({ length: visibleTickCount }, (_, index) =>
        Math.round((index * (monthCount - 1)) / (visibleTickCount - 1)),
    );
}

export function getChartTickPositions(monthCount: number, tickCount = 6) {
    const dataPositions = getChartDataPositions(monthCount);

    return getChartTickIndexes(monthCount, tickCount).map(
        (index) => dataPositions[index],
    );
}

export function getChartDataPositions(monthCount: number) {
    if (monthCount === 0) {
        return [];
    }

    const chartInset = PACKAGE_LIST_CHART_MARGIN + PACKAGE_LIST_CHART_AXIS_PADDING;
    const chartWidth = PACKAGE_LIST_CHART_WIDTH - chartInset * 2;
    const bandWidth = chartWidth / monthCount;

    return Array.from({ length: monthCount }, (_, index) =>
        ((chartInset + bandWidth * (index + 0.5)) / PACKAGE_LIST_CHART_WIDTH) * 100,
    );
}