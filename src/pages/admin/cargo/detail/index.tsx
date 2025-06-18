import { lazy } from "react"

const CargoDetailViewModule = lazy(() => import("@/entities/cargo/ui/cargo-detail-view-module"))

export default function CargoDetail() {
    return (
        <div>
            <CargoDetailViewModule />
        </div>
    )
}
