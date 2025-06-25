import { lazy } from "react"

const CargoFormModule = lazy(() => import("@/entities/cargo/ui/cargo-form-module"))

export default function CargoAddEdit() {
    return <CargoFormModule />
}
