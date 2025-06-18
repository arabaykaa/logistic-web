import { CustomButton, TextInput } from "@/shared";
import { lazy } from "react";

const RouteBackButton = lazy(() => import("@/shared/components/route-back-button"))

export default function CargoFormModule() {
    return (
        <>
            <h2 className="text-[2.25rem] font-semibold mb-4">
                Добавление груза
            </h2>
            <RouteBackButton />
            <div className="p-4 bg-white rounded-[0.5rem] border-1 border-gray-400 flex flex-col gap-4">
                <TextInput id="name" label="name" placeholder="name" />
                <TextInput id="surname" label="surname" placeholder="surname" />
                <TextInput id="phone" label="phone" placeholder="phone" />
                <TextInput id="number" label="number" placeholder="number" />
                <CustomButton
                    text="Подтвердить"
                    onClick={() => alert("Click")}
                    style={{ marginTop: "1rem" }} />
            </div>
        </>
    )
}
