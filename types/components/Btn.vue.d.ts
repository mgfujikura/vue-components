declare var __VLS_0: {};
declare var __VLS_inheritedAttrs: {};
declare const __VLS_templateResult: {
    slots: {
        default?(_: typeof __VLS_0): any;
    };
    refs: {};
    attrs: Partial<typeof __VLS_inheritedAttrs>;
};
type __VLS_Slots = typeof __VLS_templateResult['slots'];
declare const __VLS_component: import("vue").DefineComponent<__VLS_TypePropsToOption<{
    img?: string;
    disabled?: any;
    imgDisabled?: string;
    width?: number;
    height?: number;
    nineSlice?: number | {
        repeat?: string;
        slice?: string;
        width?: string;
    };
    shape?: "square" | "capsule";
    radius?: number | string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    img?: string;
    disabled?: any;
    imgDisabled?: string;
    width?: number;
    height?: number;
    nineSlice?: number | {
        repeat?: string;
        slice?: string;
        width?: string;
    };
    shape?: "square" | "capsule";
    radius?: number | string;
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
//# sourceMappingURL=Btn.vue.d.ts.map