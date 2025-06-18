import { lazy } from "react";

const CargoTableModule = lazy(() => import("@/entities/cargo/ui/cargo-table-module"))

export default function Cargo() {

    return (
        <div className="pt-12">
            <CargoTableModule />
        </div>
    )
}
