import React from "react";
import {Icon} from "@iconify/react";

interface ListProps {
    title: string;
    icon: string;
    iconColor: string;
}

const List: React.FC<ListProps> = ({
                                       title,
                                       icon,
                                       iconColor,
                                   }) => {
    return (
        <div className={'flex flex-row  gap-2 items-center justify-center'}>
            <Icon icon={icon} className={iconColor} />
            <span className={'font-semibold'}>{title}</span>
        </div>
    );
};

export default List;
