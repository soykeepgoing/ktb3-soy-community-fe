import { h } from "../../core/vdom/h.js";

export function Dropdown({
    className,
    placeholder,
    options,
    selectedValue,   // 읽기 전용 상태
    open,            // 읽기 전용 상태
    onToggle,
    onSelect
}) {
    const selectedLabel =
        options.find(o => o.value === selectedValue)?.label ||
        placeholder;

    return h(
        "div",
        { className },

        // 버튼 영역
        h("button", { onClick: onToggle }, `${selectedLabel} ▾`),

        // 드롭다운 메뉴 (open 상태에 따라 렌더 여부 결정)
        open &&
            h(
                "ul",
                { className: "dropdown-menu" },
                ...options.map(opt =>
                    h(
                        "li",
                        {
                            "data-value": opt.value,
                            className: selectedValue === opt.value ? "selected" : "",
                            onClick: () => onSelect(opt.value)
                        },
                        opt.label
                    )
                )
            )
    );
}
