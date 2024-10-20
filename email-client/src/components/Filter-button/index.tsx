import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    filterActive?: boolean;
    children: ReactNode;
}

const FilterButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const { children, className, id, filterActive, ...rest } = props;
    const classNames = className ? 'p-1 text-lg' + className : 'p-1 text-lg';
    const buttonClassName = filterActive ? classNames + 'border-filterButton border-4 rounded-xl' : classNames
    return (
        <>
            <button
                id={id}
                className={buttonClassName}
                ref={ref}
                {...rest}
            >
                {children}
            </button>

        </>
    );
});

export default FilterButton;

