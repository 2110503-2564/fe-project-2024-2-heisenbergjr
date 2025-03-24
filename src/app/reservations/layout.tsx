import styles from './reservations.module.css'
import ReservationMenu from "@/components/ReservationMenu";

export default function BookingLayout({
    children
} : {
    children:React.ReactNode
}) {
    return (
        <div className={styles.sectionlayout}>
            <ReservationMenu></ReservationMenu>
            {children}
        </div>
    );
}