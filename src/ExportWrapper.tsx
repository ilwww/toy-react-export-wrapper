import {Children, MouseEventHandler, PropsWithChildren, ReactElement, cloneElement} from 'react';

export type QueryType = ConstructorParameters<typeof URLSearchParams>[0];

export interface Props {
    onClick?: () => void;
    className?: string;
    api: string;
    query?: QueryType;
    target?: '_self';
}

export default function ExportWrapper(props: PropsWithChildren<Props>) {
    const {children, query, api, target, ...rest} = props;
    const elem = Children.only(children) as ReactElement;

    const onSubClick = async (event: MouseEventHandler<any>) => {
        // Bypass onClick if it was present
        if (elem && elem.props && typeof elem.props.onClick === 'function') {
            elem.props.onClick(event);
        }
        const queryParams = new URLSearchParams(query);
        window.open(`${api}?${queryParams.toString()}`, target);
    };

    // 被部分组件包裹（如Tooltip）后，可能会注入样式给rest.className，此时需要合并样式
    const classes = [elem?.props?.className || '', rest?.className || ''].join(' ');

    return cloneElement(
        elem,
        {
            ...rest,
            className: classes,
            onClick: onSubClick,
        });
}
