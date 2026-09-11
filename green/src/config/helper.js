import clsx from "clsx"
import { twMerge } from "tw-merge"

export const cn = (...input) => {
    return twMerge(clsx(input))
}