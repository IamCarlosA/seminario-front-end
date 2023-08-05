import { TVehicle } from "models/vehicle.interface";
import { useEffect, useState } from "react";



export const useDiscount = ( vehicle:TVehicle ) => {

    const [discount, setDiscount] = useState(undefined);
    useEffect(() => {
        if( vehicle?.discounts ) {
            const discountActive:any = vehicle.discounts.find( (act) => act?.status === "active" );
            setDiscount( discountActive?.netValue );
        };
    }, [discount, vehicle]);
    return {discount};
};
