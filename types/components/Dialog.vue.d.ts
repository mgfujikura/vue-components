declare var __VLS_5: {};
declare var __VLS_6: {};
declare var __VLS_inheritedAttrs: {};
declare const __VLS_templateResult: {
    slots: {
        title?(_: typeof __VLS_5): any;
        default?(_: typeof __VLS_6): any;
    };
    refs: {};
    attrs: Partial<typeof __VLS_inheritedAttrs>;
};
type __VLS_Slots = typeof __VLS_templateResult['slots'];
declare const __VLS_component: import("vue").DefineComponent<__VLS_TypePropsToOption<{
    width: number | string;
    height?: number | string;
    img?: string;
    titleHeight?: number;
    nineSlice?: number | {
        repeat?: string;
        slice?: string;
        width?: string;
    };
    radius?: number | string;
    dialogClass?: any;
    dialogStyle?: {
        [key: string]: any;
    };
    backgroundColor?: string;
    closeOnBackgroundClick?: boolean;
    backgroundClass?: any;
    backgroundStyle?: {
        [key: string]: any;
    };
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    width: number | string;
    height?: number | string;
    img?: string;
    titleHeight?: number;
    nineSlice?: number | {
        repeat?: string;
        slice?: string;
        width?: string;
    };
    radius?: number | string;
    dialogClass?: any;
    dialogStyle?: {
        [key: string]: any;
    };
    backgroundColor?: string;
    closeOnBackgroundClick?: boolean;
    backgroundClass?: any;
    backgroundStyle?: {
        [key: string]: any;
    };
}>>>, {}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Dialog.vue.d.ts.map