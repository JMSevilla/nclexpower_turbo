import React from "react";
import { format, parseISO } from 'date-fns';

type useDateFormatType = {
    isoDate: string,
    dateFormat?: string,
}

export const useDateFormat = () => {

    const getFormattedDate = ({ isoDate, dateFormat = "MMMM d, yyyy h:mm:ss a" }: useDateFormatType) => {

        /**
         * Check the 
         * https://date-fns.org/v2.29.3/docs/format
         * for other date formats
         */

        const date = parseISO("2024-07-10T12:00:27.428Z");
        const formattedDate = format(date, dateFormat);
        console.log(formattedDate)
        return formattedDate
    }

    return { getFormattedDate };
};
