"use client";

import { createPortal } from "react-dom";
import React from "react";
import styles from "./CanvasBarChart.module.scss";

export interface CanvasBarChartDataPoint {
    label: string;
    value: number;
}

export interface CanvasBarChartColors {
    bar: string;
    axis: string;
    label: string;
    cursor: string;
    tooltipBackground: string;
    tooltipBorder: string;
    tooltipShadow: string;
    tooltipLabel: string;
    tooltipText: string;
}

export interface BarChartGeometryOptions {
    horizontalInset: number;
    axisY: number;
    top: number;
}

export interface BarGeometry {
    centerX: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export function getBarChartGeometry(
    data: readonly CanvasBarChartDataPoint[],
    width: number,
    height: number,
    options: BarChartGeometryOptions,
): BarGeometry[] {
    if (data.length === 0) {
        return [];
    }

    const chartWidth = Math.max(0, width - options.horizontalInset * 2);
    const bandWidth = chartWidth / data.length;
    const maximum = Math.max(...data.map((point) => Math.max(0, point.value)), 0);
    const maximumBarHeight = Math.max(0, options.axisY - options.top);
    const barWidth = Math.max(4, bandWidth * 0.82);

    return data.map((point, index) => {
        const centerX = options.horizontalInset + bandWidth * (index + 0.5);
        const barHeight = maximum
            ? (Math.max(0, point.value) / maximum) * maximumBarHeight
            : 0;

        return {
            centerX,
            x: centerX - barWidth / 2,
            y: options.axisY - barHeight,
            width: barWidth,
            height: barHeight,
        };
    });
}

export function getBarIndexAtPoint(
    x: number,
    y: number,
    dataLength: number,
    width: number,
    options: BarChartGeometryOptions,
): number | null {
    if (dataLength === 0 || y < 0 || y > options.axisY) {
        return null;
    }

    const chartWidth = Math.max(0, width - options.horizontalInset * 2);
    const bandWidth = chartWidth / dataLength;
    const index = Math.floor((x - options.horizontalInset) / bandWidth);

    return index >= 0 && index < dataLength ? index : null;
}

interface CanvasBarChartContextValue {
    data: readonly CanvasBarChartDataPoint[];
    width: number;
    height: number;
    colors: CanvasBarChartColors;
    geometryOptions: BarChartGeometryOptions;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    rootRef: React.RefObject<HTMLDivElement | null>;
    ariaLabel: string;
    accessibleDataId: string;
    activeIndex: number | null;
    tooltipPosition: { x: number; y: number } | null;
    setActiveIndex: (index: number | null) => void;
    setActiveFromPointer: (event: React.PointerEvent<HTMLCanvasElement>) => void;
}

const CanvasBarChartContext = React.createContext<CanvasBarChartContextValue | null>(
    null,
);

function useCanvasBarChartContext() {
    const context = React.useContext(CanvasBarChartContext);

    if (!context) {
        throw new Error("CanvasBarChart components must be used inside Root.");
    }

    return context;
}

interface CanvasBarChartRootProps {
    children: React.ReactNode;
    data: readonly CanvasBarChartDataPoint[];
    width: number;
    height: number;
    colors: CanvasBarChartColors;
    geometryOptions: BarChartGeometryOptions;
    ariaLabel: string;
    accessibleDataId: string;
}

function CanvasBarChartRoot({
    children,
    data,
    width,
    height,
    colors,
    geometryOptions,
    ariaLabel,
    accessibleDataId,
}: CanvasBarChartRootProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndexState] = React.useState<number | null>(null);
    const [tooltipPosition, setTooltipPosition] = React.useState<{
        x: number;
        y: number;
    } | null>(null);

    const getTooltipPosition = React.useCallback(
        (index: number | null) => {
            if (index === null) {
                return null;
            }

            const canvas = canvasRef.current;
            const bar = getBarChartGeometry(
                data,
                width,
                height,
                geometryOptions,
            )[index];

            if (!canvas || !bar) {
                return null;
            }

            const bounds = canvas.getBoundingClientRect();
            const scaleX = bounds.width / width;
            const scaleY = bounds.height / height;
            const x = Math.max(
                90,
                Math.min(
                    window.innerWidth - 90,
                    bounds.left + bar.centerX * scaleX,
                ),
            );
            const y = Math.max(8, bounds.top + bar.y * scaleY - 8);

            return { x, y };
        },
        [data, geometryOptions, height, width],
    );

    const setActiveIndex = React.useCallback(
        (index: number | null) => {
            setActiveIndexState(index);
            setTooltipPosition(getTooltipPosition(index));
        },
        [getTooltipPosition],
    );

    const setActiveFromPointer = React.useCallback(
        (event: React.PointerEvent<HTMLCanvasElement>) => {
            const canvas = event.currentTarget;
            const bounds = canvas.getBoundingClientRect();
            const scaleX = width / bounds.width;
            const scaleY = height / bounds.height;
            const x = (event.clientX - bounds.left) * scaleX;
            const y = (event.clientY - bounds.top) * scaleY;

            setActiveIndex(
                getBarIndexAtPoint(x, y, data.length, width, geometryOptions),
            );
        },
        [data.length, geometryOptions, height, setActiveIndex, width],
    );

    React.useEffect(() => {
        if (activeIndex === null) {
            return undefined;
        }

        const handleOutsidePointer = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setActiveIndex(null);
            }
        };

        document.addEventListener("pointerdown", handleOutsidePointer);

        return () => document.removeEventListener("pointerdown", handleOutsidePointer);
    }, [activeIndex, setActiveIndex]);

    const contextValue = {
        data,
        width,
        height,
        colors,
        geometryOptions,
        canvasRef,
        rootRef,
        ariaLabel,
        accessibleDataId,
        activeIndex,
        tooltipPosition,
        setActiveIndex,
        setActiveFromPointer,
    } satisfies CanvasBarChartContextValue;

    return (
        <CanvasBarChartContext.Provider value={contextValue}>
            <div
                ref={rootRef}
                className={styles.root}
                style={{ width, height }}
            >
                {children}
            </div>
        </CanvasBarChartContext.Provider>
    );
}

function roundRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
) {
    const resolvedRadius = Math.min(radius, width / 2, height / 2);

    context.beginPath();
    context.roundRect(x, y, width, height, resolvedRadius);
}

function getStableAnimationRanks(
    data: readonly CanvasBarChartDataPoint[],
): number[] {
    const orderedIndexes = data
        .map((point, index) => {
            let hash = 2166136261;

            for (const character of `${point.label}:${index}`) {
                hash ^= character.charCodeAt(0);
                hash = Math.imul(hash, 16777619);
            }

            return { hash: hash >>> 0, index };
        })
        .sort((left, right) => left.hash - right.hash)
        .map(({ index }) => index);
    const ranks = Array.from({ length: data.length }, () => 0);

    orderedIndexes.forEach((index, rank) => {
        ranks[index] = rank;
    });

    return ranks;
}

function resolveCssColor(element: HTMLElement, color: string) {
    const variableName = color.match(/^var\((--[^,)]+)(?:,.*)?\)$/)?.[1];

    if (!variableName) {
        return color;
    }

    return getComputedStyle(element).getPropertyValue(variableName).trim() || color;
}

function resolveCanvasColors(
    canvas: HTMLCanvasElement,
    colors: CanvasBarChartColors,
): CanvasBarChartColors {
    return {
        bar: resolveCssColor(canvas, colors.bar),
        axis: resolveCssColor(canvas, colors.axis),
        label: resolveCssColor(canvas, colors.label),
        cursor: resolveCssColor(canvas, colors.cursor),
        tooltipBackground: resolveCssColor(canvas, colors.tooltipBackground),
        tooltipBorder: resolveCssColor(canvas, colors.tooltipBorder),
        tooltipShadow: resolveCssColor(canvas, colors.tooltipShadow),
        tooltipLabel: resolveCssColor(canvas, colors.tooltipLabel),
        tooltipText: resolveCssColor(canvas, colors.tooltipText),
    };
}

function drawCanvasChart(
    canvas: HTMLCanvasElement,
    data: readonly CanvasBarChartDataPoint[],
    width: number,
    height: number,
    colors: CanvasBarChartColors,
    geometryOptions: BarChartGeometryOptions,
    activeIndex: number | null,
    barProgress: readonly number[],
) {
    const context = canvas.getContext("2d");

    if (!context) {
        return;
    }

    const devicePixelRatio = canvas.width / width;

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    const geometry = getBarChartGeometry(data, width, height, geometryOptions);
    const axisY = geometryOptions.axisY;

    if (activeIndex !== null && geometry[activeIndex]) {
        const activeBar = geometry[activeIndex];
        const chartWidth = width - geometryOptions.horizontalInset * 2;
        const bandWidth = chartWidth / data.length;

        context.fillStyle = colors.cursor;
        context.fillRect(
            activeBar.centerX - bandWidth / 2,
            0,
            bandWidth,
            axisY,
        );
    }

    context.fillStyle = colors.bar;

    geometry.forEach((bar, index) => {
        const progress = barProgress[index] ?? 1;
        const animatedHeight = bar.height * progress;

        if (animatedHeight === 0) {
            return;
        }

        roundRect(
            context,
            bar.x,
            axisY - animatedHeight,
            bar.width,
            animatedHeight,
            4,
        );
        context.fill();
    });

    context.strokeStyle = colors.axis;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(geometryOptions.horizontalInset, axisY);
    context.lineTo(width - geometryOptions.horizontalInset, axisY);
    context.stroke();

    context.font = "16px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "bottom";
    context.fillStyle = colors.label;

    geometry.forEach((bar, index) => {
        context.fillText(data[index].label, bar.centerX, height - 3);
    });
}

function CanvasBarChartCanvas() {
    const {
        data,
        width,
        height,
        colors,
        geometryOptions,
        canvasRef,
        activeIndex,
        accessibleDataId,
        ariaLabel,
        setActiveIndex,
        setActiveFromPointer,
    } = useCanvasBarChartContext();
    const activeIndexRef = React.useRef(activeIndex);
    const progressRef = React.useRef<number[]>([]);

    React.useEffect(() => {
        activeIndexRef.current = activeIndex;

        const canvas = canvasRef.current;

        if (canvas && progressRef.current.length > 0) {
            drawCanvasChart(
                canvas,
                data,
                width,
                height,
                resolveCanvasColors(canvas, colors),
                geometryOptions,
                activeIndex,
                progressRef.current,
            );
        }
    }, [activeIndex, canvasRef, colors, data, geometryOptions, height, width]);

    React.useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        if (!canvas.getContext("2d")) {
            return;
        }

        canvas.width = Math.round(width * devicePixelRatio);
        canvas.height = Math.round(height * devicePixelRatio);
        const animationColors = resolveCanvasColors(canvas, colors);

        const ranks = getStableAnimationRanks(data);
        const animationDuration = 620;
        const staggerDuration = 260;
        const animationStart = performance.now();
        let animationFrame = 0;

        const drawFrame = (timestamp: number) => {
            const elapsed = timestamp - animationStart;
            const progress = ranks.map((rank) => {
                const delay = data.length > 1
                    ? (rank / (data.length - 1)) * staggerDuration
                    : 0;
                const linearProgress = Math.min(
                    1,
                    Math.max(0, (elapsed - delay) / animationDuration),
                );

                return 1 - (1 - linearProgress) ** 3;
            });

            progressRef.current = progress;
            drawCanvasChart(
                canvas,
                data,
                width,
                height,
                animationColors,
                geometryOptions,
                activeIndexRef.current,
                progress,
            );

            if (progress.some((value) => value < 1)) {
                animationFrame = requestAnimationFrame(drawFrame);
            }
        };

        animationFrame = requestAnimationFrame(drawFrame);
        const themeObserver = new MutationObserver(() => {
            const currentColors = resolveCanvasColors(canvas, colors);
            const currentProgress = progressRef.current.length > 0
                ? progressRef.current
                : data.map(() => 1);

            drawCanvasChart(
                canvas,
                data,
                width,
                height,
                currentColors,
                geometryOptions,
                activeIndexRef.current,
                currentProgress,
            );
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => {
            cancelAnimationFrame(animationFrame);
            themeObserver.disconnect();
        };
    }, [canvasRef, colors, data, geometryOptions, height, width]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
        if (data.length === 0) {
            return;
        }

        if (event.key === "Escape") {
            setActiveIndex(null);
            return;
        }

        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            return;
        }

        event.preventDefault();
        const currentIndex = activeIndex ?? 0;
        const nextIndex =
            event.key === "ArrowLeft"
                ? Math.max(0, currentIndex - 1)
                : event.key === "ArrowRight"
                    ? Math.min(data.length - 1, currentIndex + 1)
                    : event.key === "Home"
                        ? 0
                        : data.length - 1;

        setActiveIndex(nextIndex);
    };

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
            width={width}
            height={height}
            role="img"
            aria-label={ariaLabel}
            aria-describedby={accessibleDataId}
            tabIndex={0}
            onPointerMove={setActiveFromPointer}
            onPointerDown={(event) => {
                event.stopPropagation();
                setActiveFromPointer(event);
            }}
            onPointerLeave={(event) => {
                if (event.pointerType === "mouse") {
                    setActiveIndex(null);
                }
            }}
            onPointerCancel={() => setActiveIndex(null)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
                event.stopPropagation();
                handleKeyDown(event);
            }}
        />
    );
}

function CanvasBarChartTooltip() {
    const {
        data,
        colors,
        activeIndex,
        tooltipPosition,
    } = useCanvasBarChartContext();

    if (activeIndex === null || !data[activeIndex] || !tooltipPosition) {
        return null;
    }

    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div
            className={styles.tooltip}
            style={{
                background: colors.tooltipBackground,
                borderColor: colors.tooltipBorder,
                boxShadow: `0 0.25rem 0.5rem ${colors.tooltipShadow}`,
                left: tooltipPosition.x,
                top: tooltipPosition.y,
            }}
            role="status"
            aria-live="polite"
        >
            <span
                className={styles.tooltipLabel}
                style={{ color: colors.tooltipLabel }}
            >
                {data[activeIndex].label}
            </span>
            <span
                className={styles.tooltipValue}
                style={{ color: colors.tooltipText }}
            >
                Vulnerabilities occurrences: {data[activeIndex].value}
            </span>
        </div>,
        document.body,
    );
}

function CanvasBarChartAccessibleData() {
    const { data, accessibleDataId, ariaLabel } = useCanvasBarChartContext();

    return (
        <ul id={accessibleDataId} className={styles.accessibleData} aria-label={ariaLabel}>
            {data.map((point) => (
                <li key={point.label}>
                    {point.label}: {point.value} vulnerabilities occurrences
                </li>
            ))}
        </ul>
    );
}

export const CanvasBarChart = {
    Root: CanvasBarChartRoot,
    Canvas: CanvasBarChartCanvas,
    Tooltip: CanvasBarChartTooltip,
    AccessibleData: CanvasBarChartAccessibleData,
};