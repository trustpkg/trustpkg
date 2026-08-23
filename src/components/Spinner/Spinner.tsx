import { Progress } from "@ark-ui/react";
import { SpinnerProps } from "./Spinner.types";
import styles from './Spinner.module.scss'
import { Base } from "../Base/Base";


export function SpinnerComponent(props: SpinnerProps) {
    const { isLoading, IconSlot = null } = props

    return isLoading ? (
        <Progress.Root
            className={styles.spinner}
            defaultValue={null}
        >
            <div className={styles.spinner_circleContainer}>
                <Progress.Circle
                    className={styles.spinner_circle}
                    style={
                        {
                            "--size": "24px",
                            "--thickness": "4px",
                        } as React.CSSProperties
                    }
                >
                    <Progress.CircleTrack
                        className={styles.spinner_circleTrack}
                    />
                    <Progress.CircleRange
                        className={styles.spinner_circleRange}
                    />
                </Progress.Circle>
                <Progress.ValueText
                    className={styles.spinner_valueText}
                />
            </div>
        </Progress.Root>
    ) :
        IconSlot ?
            <Base asChild as="svg" className={styles.spinnerSkeleton}>
                {IconSlot}
            </Base>
            : <span className={styles.spinnerSkeleton} />
}