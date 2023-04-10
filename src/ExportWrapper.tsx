import React from 'react';

export type QueryType = ConstructorParameters<typeof URLSearchParams>[0];

export interface Props {
    onClick?: () => void;
    className?: string;
    api: string;
    query?: QueryType;
    target?: '_self';
}

export default function ExportWrapper(props: React.PropsWithChildren<Props>) {
    const {children, query, api, target, ...rest} = props;
    const elem = React.Children.only(children) as React.ReactElement;

    const onSubClick = React.useCallback(
        async (event: React.MouseEventHandler<any>) => {
            // Bypass onClick if it was present
            if (elem && elem.props && typeof elem.props.onClick === 'function') {
                elem.props.onClick(event);
            }
            const queryParams = new URLSearchParams(query);
            window.open(`${api}?${queryParams.toString()}`, target);
        },
        [api, elem, query, target]
    );

    // 被部分组件包裹（如Tooltip）后，可能会注入样式给rest.className，此时需要合并样式
    const classes = [elem?.props?.className || '', rest?.className || ''].join(' ');

    return React.cloneElement(
        elem,
        {
            ...rest,
            className: classes,
            onClick: onSubClick,
        });
}
